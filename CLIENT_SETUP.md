# Anodite AI - Client Repository Setup Guide 🚀

This guide will help you install and configure Anodite AI on your repositories to get automated AI-powered code reviews on every pull request.

## What is Anodite AI?

Anodite AI is an AI-powered code review assistant that automatically analyzes pull requests and provides intelligent feedback, suggestions, and identifies potential issues in your code. It works as a GitHub App, appearing just like other professional tools (CodeRabbit, Dependabot, etc.).

---

## Quick Setup (5 Minutes)

### Prerequisites

- Repository with admin access (to install GitHub Apps)
- GitHub account

### Step 1: Install the GitHub App

1. **Visit the Anodite AI GitHub App page:**
   - Go to: `https://github.com/apps/anodite-ai` (or your organization's app URL)

2. **Click "Install"**

3. **Choose repositories:**
   - Select **"All repositories"** to enable on all current and future repos
   - OR select **"Only select repositories"** and choose specific repos

4. **Click "Install"**

5. **You'll be redirected** to a confirmation page

That's it! Anodite AI is now installed and ready to review your pull requests.

---

## How It Works

Once installed, Anodite AI will automatically:

1. **Monitor Pull Requests** - Watches for new PRs and updates
2. **Analyze Code Changes** - Reviews the diff using AI
3. **Provide Feedback** - Posts inline comments and general suggestions
4. **Continuous Review** - Re-analyzes when new commits are pushed

### What Gets Reviewed?

Anodite AI analyzes:
- ✅ Code logic and potential bugs
- ✅ Code quality and best practices
- ✅ Security vulnerabilities
- ✅ Performance issues
- ✅ Code style and maintainability
- ✅ Edge cases and error handling

### What Doesn't Get Reviewed?

Anodite AI automatically skips:
- ❌ Documentation-only changes (unless code is also changed)
- ❌ Dependency lock files
- ❌ Generated files
- ❌ Binary files

---

## Testing the Setup

### Create a Test Pull Request

1. **Create a new branch:**
   ```bash
   git checkout -b test-anodite-ai
   ```

2. **Make a code change** (any file):
   ```bash
   echo "console.log('Testing Anodite AI');" >> test.js
   ```

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Test Anodite AI review"
   git push origin test-anodite-ai
   ```

4. **Create a Pull Request** on GitHub

5. **Wait 30-60 seconds** - Anodite AI will post a review with the 🤠 emoji

---

## Understanding Anodite AI Reviews

### Review Format

Anodite AI provides two types of feedback:

**1. Inline Comments**
- Posted directly on specific lines of code
- Appear in the "Files changed" tab
- Address specific issues in that code section

**2. General Feedback**
- Posted as a review comment
- Provides overall observations
- Includes suggestions that apply to multiple files

### Review Example

```
🤠 ReviewRanger Analysis Complete

I've analyzed your code changes and provided feedback below.

General Feedback:

• src/api/users.js: Consider adding input validation for the email parameter 
  to prevent potential security issues.

• src/utils/helper.js: The error handling in the parseData function could be 
  improved by catching specific error types.
```

---

## Configuration Options

### Adjusting Review Sensitivity

If you find reviews too strict or too lenient, contact your Anodite AI administrator to adjust the AI model or prompt configuration.

### Ignoring Specific Files

To exclude certain files from review, create a `.anodite-ignore` file in your repository root:

```
# .anodite-ignore
node_modules/
*.log
*.md
package-lock.json
dist/
build/
*.min.js
```

**Note:** This feature may need to be implemented by your Anodite AI administrator.

---

## Best Practices

### 1. Review AI Feedback Carefully

- AI suggestions are helpful but not infallible
- Use your judgment to accept or dismiss feedback
- Engage in discussion if you disagree with a suggestion

### 2. Keep PRs Focused

- Smaller PRs get better, more focused reviews
- Large PRs (500+ lines) may have less detailed feedback
- Consider breaking large changes into multiple PRs

### 3. Respond to Feedback

- Mark conversations as resolved when addressed
- Reply to AI comments if you need clarification
- Use feedback to improve code quality

### 4. Don't Rely Solely on AI

- AI reviews complement, not replace, human reviews
- Always have team members review critical changes
- Use AI feedback as a first pass before human review

---

## Troubleshooting

### Common Issues

**❌ "No review appears on my PR"**

**Possible causes:**
- PR has no code changes (only README, docs, etc.)
- PR is too large (>1000 lines) - try breaking it up
- Anodite AI app is not installed on the repository
- There was a temporary service issue

**Solutions:**
1. Check the PR has actual code changes
2. Verify the app is installed: Settings → Integrations → GitHub Apps
3. Wait a few minutes and refresh the page
4. Check GitHub App webhook deliveries for errors

**❌ "Review comments seem incorrect"**

**Possible causes:**
- AI misunderstood the context
- Code requires domain-specific knowledge
- Edge case the AI didn't consider

**Solutions:**
1. Reply to the comment explaining the context
2. Dismiss the review if it's not applicable
3. Report persistent issues to your administrator

**❌ "App is not responding"**

**Possible causes:**
- Service is down or experiencing issues
- Webhook delivery failed
- API rate limits reached

**Solutions:**
1. Check the status page (if available)
2. Contact your Anodite AI administrator
3. Try closing and reopening the PR to trigger a new review

---

## Managing the Installation

### Viewing Installed Repositories

1. Go to your GitHub account settings
2. Navigate to **Applications** → **Installed GitHub Apps**
3. Find **Anodite AI**
4. Click **Configure** to manage repository access

### Adding More Repositories

1. Go to the Anodite AI configuration page (see above)
2. Under **Repository access**, select additional repositories
3. Click **Save**

### Removing from Repositories

1. Go to the Anodite AI configuration page
2. Under **Repository access**, deselect repositories
3. Click **Save**

### Uninstalling Completely

1. Go to **Applications** → **Installed GitHub Apps**
2. Find **Anodite AI**
3. Click **Configure**
4. Scroll down and click **Uninstall**

---

## Privacy & Security

### What Data is Accessed?

Anodite AI only accesses:
- ✅ Pull request diffs (code changes)
- ✅ Pull request metadata (title, description)
- ✅ Repository metadata (name, owner)

Anodite AI does NOT access:
- ❌ Your entire codebase
- ❌ Issues or discussions
- ❌ Repository secrets
- ❌ Personal information

### Where is Data Sent?

- Code diffs are sent to OpenAI's API for analysis
- No code is stored permanently
- All data transmission is encrypted (HTTPS)
- OpenAI's data usage policy applies

### Security Best Practices

- Review OpenAI's data usage policy
- Don't include secrets or credentials in code
- Use GitHub Secrets for sensitive data
- Regularly audit installed GitHub Apps

---

## Cost Information

### For Repository Owners

- Anodite AI is typically provided by your organization
- No direct cost to repository users
- Usage is covered by the organization's OpenAI credits

### Approximate Costs (for administrators)

- **Small PR (< 100 lines):** ~$0.01-0.05
- **Medium PR (100-500 lines):** ~$0.05-0.15
- **Large PR (500+ lines):** ~$0.15-0.50

*Costs depend on AI model and code complexity*

---

## Getting Help

### Support Channels

- **GitHub Issues:** [anodite-ai/issues](https://github.com/thehackersplaybook/anodite-ai/issues)
- **Documentation:** [DEVELOPER_SETUP.md](./DEVELOPER_SETUP.md)
- **Organization Contact:** Your Anodite AI administrator

### Reporting Issues

When reporting issues, include:
1. Repository name
2. Pull request number
3. Description of the issue
4. Screenshots (if applicable)
5. Expected vs actual behavior

---

## FAQ

**Q: Will Anodite AI approve or block my PR?**
A: No, Anodite AI only provides feedback. It doesn't approve or block PRs. Human reviewers make the final decision.

**Q: Can I disable Anodite AI for specific PRs?**
A: Currently, Anodite AI reviews all PRs. To skip a PR, you can ignore the review comments.

**Q: How long does a review take?**
A: Typically 30-60 seconds for small PRs, up to 2-3 minutes for large PRs.

**Q: Can Anodite AI review draft PRs?**
A: Currently, Anodite AI only reviews PRs marked as "Ready for review", not drafts.

**Q: Does Anodite AI learn from my feedback?**
A: Not automatically. However, administrators can adjust the AI configuration based on team feedback.

**Q: What programming languages are supported?**
A: Anodite AI supports all major programming languages including JavaScript, TypeScript, Python, Java, Go, Rust, and more.

**Q: Can I customize the review style?**
A: Customization is managed by your Anodite AI administrator. Contact them for specific requests.

---

## Advanced Usage

### Requesting Specific Reviews

You can guide Anodite AI by including specific requests in your PR description:

```markdown
## Review Focus

Please pay special attention to:
- Security implications of the authentication changes
- Performance of the database queries
- Error handling in the API endpoints
```

### Integrating with CI/CD

Anodite AI works alongside your existing CI/CD pipeline:
- Runs independently of other checks
- Doesn't block merging (unless configured otherwise)
- Complements automated tests and linters

---

## Comparison with Other Tools

| Feature | Anodite AI | CodeRabbit | GitHub Copilot |
|---------|-----------|-----------|----------------|
| **PR Reviews** | ✅ | ✅ | ❌ |
| **Inline Comments** | ✅ | ✅ | ❌ |
| **Code Suggestions** | ✅ | ✅ | ✅ |
| **Open Source** | ✅ | ❌ | ❌ |
| **Self-Hosted** | ✅ | ❌ | ❌ |
| **Cost** | Pay-per-use | Subscription | Subscription |

---

## Next Steps

1. ✅ Install Anodite AI on your repositories
2. ✅ Create a test PR to see it in action
3. ✅ Share feedback with your team
4. ✅ Integrate into your development workflow

---

**Welcome to automated code reviews!** 🤠 Anodite AI is here to help your team ship better code, faster.

For technical setup and customization, see [DEVELOPER_SETUP.md](./DEVELOPER_SETUP.md).
