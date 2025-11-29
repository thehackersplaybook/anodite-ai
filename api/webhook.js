const { Octokit } = require('@octokit/rest');
const { createAppAuth } = require('@octokit/auth-app');
const OpenAI = require('openai');

// GitHub App configuration
const APP_ID = process.env.GITHUB_APP_ID;
const PRIVATE_KEY = process.env.GITHUB_PRIVATE_KEY;
const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

// PR Review prompt
const PROMPT_FOR_PR_REVIEW = 
  'You are ReviewRanger 🤠, an AI code review assistant. Review the code changes carefully and provide helpful feedback.' +
  ' - Look for potential bugs, edge cases, or logic errors' +
  ' - Be clear and provide actionable feedback' +
  ' - Only provide comments you are confident about' +
  ' - Return ONLY a list of comments as JSON array' +
  ' - Format: [{"path": "file/path", "position": line_number, "body": "comment"}]' +
  ' - If no issues found, return empty array []';

async function verifyWebhookSignature(payload, signature) {
  const crypto = require('crypto');
  const expectedSignature = 'sha256=' + crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

async function getInstallationOctokit(installationId) {
  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: APP_ID,
      privateKey: PRIVATE_KEY,
      installationId: installationId,
    },
  });
  
  return octokit;
}

async function getPullRequestDiff(octokit, owner, repo, pullNumber) {
  try {
    const response = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: pullNumber,
      mediaType: { format: 'diff' }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching PR diff:', error);
    throw error;
  }
}

function parseDiffToChanges(diffString, prTitle, prBody) {
  const lines = diffString.split('\n');
  const changes = [];
  let currentFile = '';
  let currentDiff = [];
  let diffPositionMap = new Map(); // Map to track valid diff positions
  let position = 0;
  
  for (const line of lines) {
    if (line.startsWith('diff --git')) {
      if (currentFile && currentDiff.length > 0) {
        changes.push({
          filename: currentFile,
          diff: currentDiff.join('\n'),
          positions: diffPositionMap.get(currentFile) || []
        });
      }
      currentFile = line.split(' b/')[1] || '';
      currentDiff = [];
      diffPositionMap.set(currentFile, []);
      position = 0;
    }
    
    if (currentFile) {
      currentDiff.push(line);
      
      // Track positions for added/modified lines (lines starting with + or context)
      if (line.startsWith('+') || line.startsWith(' ') || line.startsWith('-')) {
        position++;
        if (line.startsWith('+')) {
          diffPositionMap.get(currentFile).push(position);
        }
      }
    }
  }
  
  if (currentFile && currentDiff.length > 0) {
    changes.push({
      filename: currentFile,
      diff: currentDiff.join('\n'),
      positions: diffPositionMap.get(currentFile) || []
    });
  }
  
  return {
    title: prTitle,
    description: prBody,
    changes: changes
  };
}

async function getAIReview(codeChanges) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: PROMPT_FOR_PR_REVIEW
        },
        {
          role: 'user',
          content: JSON.stringify(codeChanges)
        }
      ],
      temperature: 0.3
    });
    
    const content = response.choices?.[0]?.message?.content;
    if (!content) {
      console.log('No content returned from OpenAI');
      return [];
    }
    
    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.log('Error parsing OpenAI response:', parseError);
      return [];
    }
  } catch (error) {
    console.error('Error getting AI review:', error);
    return [];
  }
}

async function postReviewComments(octokit, owner, repo, pullNumber, comments, codeChanges) {
  if (!comments || comments.length === 0) {
    console.log('No comments to post');
    return;
  }
  
  // Filter out comments with invalid positions and create fallback
  const validComments = [];
  const invalidComments = [];
  
  for (const comment of comments) {
    const fileChange = codeChanges.changes.find(c => c.filename === comment.path);
    if (fileChange && fileChange.positions && fileChange.positions.includes(comment.position)) {
      validComments.push(comment);
    } else {
      invalidComments.push(comment);
    }
  }
  
  try {
    // Create review body with invalid comments as general feedback
    let reviewBody = '🤠 **ReviewRanger Analysis Complete**\n\nI\'ve analyzed your code changes and provided feedback below.';
    
    if (invalidComments.length > 0) {
      reviewBody += '\n\n**General Feedback:**\n';
      for (const comment of invalidComments) {
        reviewBody += `\n• **${comment.path}**: ${comment.body}`;
      }
    }
    
    // Post review with valid inline comments and general feedback
    await octokit.rest.pulls.createReview({
      owner,
      repo,
      pull_number: pullNumber,
      event: 'COMMENT',
      body: reviewBody,
      comments: validComments
    });
    
    console.log(`Posted review with ${validComments.length} inline comments and ${invalidComments.length} general comments`);
  } catch (error) {
    console.error('Error posting review:', error);
    
    // Fallback: Post as general PR comment if review fails
    try {
      let fallbackBody = '🤠 **ReviewRanger Analysis**\n\nI\'ve analyzed your code changes:';
      for (const comment of comments) {
        fallbackBody += `\n\n• **${comment.path}**: ${comment.body}`;
      }
      
      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: pullNumber,
        body: fallbackBody
      });
      
      console.log('Posted fallback general comment');
    } catch (fallbackError) {
      console.error('Error posting fallback comment:', fallbackError);
      throw error;
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Verify webhook signature
    const signature = req.headers['x-hub-signature-256'];
    const payload = JSON.stringify(req.body);
    
    if (!await verifyWebhookSignature(payload, signature)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    const { action, pull_request, installation, repository } = req.body;
    
    // Only process opened, synchronize, and reopened PR events
    if (!pull_request || !['opened', 'synchronize', 'reopened'].includes(action)) {
      return res.status(200).json({ message: 'Event ignored' });
    }
    
    console.log(`Processing PR #${pull_request.number} in ${repository.full_name}`);
    
    // Get installation Octokit
    const octokit = await getInstallationOctokit(installation.id);
    
    // Get PR diff
    const diffString = await getPullRequestDiff(
      octokit,
      repository.owner.login,
      repository.name,
      pull_request.number
    );
    
    // Parse changes
    const codeChanges = parseDiffToChanges(
      diffString,
      pull_request.title,
      pull_request.body
    );
    
    // Get AI review
    const aiComments = await getAIReview(codeChanges);
    console.log('AI Comments:', JSON.stringify(aiComments, null, 2));
    
    // Post review comments with improved position handling
    await postReviewComments(
      octokit,
      repository.owner.login,
      repository.name,
      pull_request.number,
      aiComments,
      codeChanges
    );
    
    return res.status(200).json({ 
      message: 'Review completed',
      comments_posted: aiComments.length
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    });
  }
}
