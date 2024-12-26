import { PullRequest } from './pull_request'
import { OpenAIInterface } from './llm_interface'
import { AIReviewer } from './ai_reviewer'
import * as core from '@actions/core'
import * as github from '@actions/github'

const OPENAI_KEY: string = core.getInput('openai-key')
const GPT_MODEL: string = core.getInput('gpt-model')

/**
 * Represents a GitHub Pull Request context.
 */
interface PullRequestContext {
  title: string
  body: string
  // Include more fields from the GitHub API as needed
}

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    console.log('Starting PR review action with GPT model:', GPT_MODEL)
    const pr_context = github.context.payload.pull_request as any;
    console.log(pr_context);
    
    // const pr_context = {
    //   action: 'assigned',
    //   title: 'random',
    //   body: 'random',
    //   assignee: {
    //     login: 'dummy-user',
    //     id: 123456,
    //     node_id: 'MDQ6VXNlcjEyMzQ1Ng==',
    //     avatar_url: 'https://avatars.githubusercontent.com/u/123456?v=4',
    //     gravatar_id: '',
    //     url: 'https://api.github.com/users/dummy-user',
    //     html_url: 'https://github.com/dummy-user',
    //     followers_url: 'https://api.github.com/users/dummy-user/followers',
    //     following_url:
    //       'https://api.github.com/users/dummy-user/following{/other_user}',
    //     gists_url: 'https://api.github.com/users/dummy-user/gists{/gist_id}',
    //     starred_url:
    //       'https://api.github.com/users/dummy-user/starred{/owner}{/repo}',
    //     subscriptions_url:
    //       'https://api.github.com/users/dummy-user/subscriptions',
    //     organizations_url: 'https://api.github.com/users/dummy-user/orgs',
    //     repos_url: 'https://api.github.com/users/dummy-user/repos',
    //     events_url: 'https://api.github.com/users/dummy-user/events{/privacy}',
    //     received_events_url:
    //       'https://api.github.com/users/dummy-user/received_events',
    //     type: 'User',
    //     site_admin: false
    //   },
    //   number: 42,
    //   pull_request: {
    //     _links: {
    //       self: {
    //         href: 'https://api.github.com/repos/dummy-org/dummy-repo/pulls/42'
    //       },
    //       html: {
    //         href: 'https://github.com/dummy-org/dummy-repo/pull/42'
    //       },
    //       issue: {
    //         href: 'https://api.github.com/repos/dummy-org/dummy-repo/issues/42'
    //       },
    //       comments: {
    //         href: 'https://api.github.com/repos/dummy-org/dummy-repo/issues/42/comments'
    //       },
    //       review_comments: {
    //         href: 'https://api.github.com/repos/dummy-org/dummy-repo/pulls/42/comments'
    //       },
    //       review_comment: {
    //         href: 'https://api.github.com/repos/dummy-org/dummy-repo/pulls/comments{/number}'
    //       },
    //       commits: {
    //         href: 'https://api.github.com/repos/dummy-org/dummy-repo/pulls/42/commits'
    //       },
    //       statuses: {
    //         href: 'https://api.github.com/repos/dummy-org/dummy-repo/statuses/dummy-sha'
    //       }
    //     },
    //     active_lock_reason: null,
    //     additions: 15,
    //     assignee: {
    //       login: 'dummy-user',
    //       id: 123456
    //     },
    //     assignees: [
    //       {
    //         login: 'dummy-user',
    //         id: 123456
    //       }
    //     ],
    //     author_association: 'MEMBER',
    //     auto_merge: null,
    //     base: {
    //       ref: 'main',
    //       sha: 'dummy-sha',
    //       repo: {
    //         id: 654321,
    //         owner: {
    //           login: 'random'
    //         },
    //         name: 'dummy-repo',
    //         full_name: 'dummy-org/dummy-repo',
    //         html_url: 'https://github.com/dummy-org/dummy-repo'
    //       }
    //     },
    //     body: 'This is a dummy pull request for testing purposes.',
    //     changed_files: 3,
    //     closed_at: null,
    //     comments: 2,
    //     comments_url:
    //       'https://api.github.com/repos/dummy-org/dummy-repo/issues/42/comments',
    //     commits: 1,
    //     commits_url:
    //       'https://api.github.com/repos/dummy-org/dummy-repo/pulls/42/commits',
    //     created_at: '2024-12-23T00:00:00Z',
    //     deletions: 5,
    //     diff_url: 'https://github.com/dummy-org/dummy-repo/pull/42.diff',
    //     draft: false,
    //     head: {
    //       ref: 'feature-branch',
    //       sha: 'dummy-feature-sha',
    //       repo: {
    //         id: 654321,
    //         name: 'dummy-repo',
    //         full_name: 'dummy-org/dummy-repo',
    //         html_url: 'https://github.com/dummy-org/dummy-repo'
    //       }
    //     },
    //     html_url: 'https://github.com/dummy-org/dummy-repo/pull/42',
    //     id: 987654321,
    //     issue_url:
    //       'https://api.github.com/repos/dummy-org/dummy-repo/issues/42',
    //     labels: [
    //       {
    //         id: 112233,
    //         node_id: 'MDU6TGFiZWwxMTIyMzM=',
    //         url: 'https://api.github.com/repos/dummy-org/dummy-repo/labels/enhancement',
    //         name: 'enhancement',
    //         color: '84b6eb',
    //         default: true,
    //         description: 'New feature or request'
    //       }
    //     ],
    //     locked: false,
    //     maintainer_can_modify: true,
    //     merge_commit_sha: null,
    //     merged: false,
    //     merged_at: null,
    //     merged_by: null,
    //     milestone: null,
    //     node_id: 'MDExOlB1bGxSZXF1ZXN0OTg3NjU0MzIx',
    //     number: 42,
    //     patch_url: 'https://github.com/dummy-org/dummy-repo/pull/42.patch',
    //     rebaseable: true,
    //     requested_reviewers: [
    //       {
    //         login: 'reviewer-user',
    //         id: 789012
    //       }
    //     ],
    //     requested_teams: [],
    //     review_comment_url:
    //       'https://api.github.com/repos/dummy-org/dummy-repo/pulls/comments{/number}',
    //     review_comments: 1,
    //     review_comments_url:
    //       'https://api.github.com/repos/dummy-org/dummy-repo/pulls/42/comments',
    //     state: 'open',
    //     statuses_url:
    //       'https://api.github.com/repos/dummy-org/dummy-repo/statuses/dummy-sha',
    //     title: 'Add new feature for testing',
    //     updated_at: '2024-12-23T00:00:00Z',
    //     url: 'https://api.github.com/repos/dummy-org/dummy-repo/pulls/42',
    //     user: {
    //       login: 'dummy-author',
    //       id: 654321,
    //       node_id: 'MDQ6VXNlcjY1NDMyMQ==',
    //       avatar_url: 'https://avatars.githubusercontent.com/u/654321?v=4',
    //       html_url: 'https://github.com/dummy-author'
    //     }
    //   },
    //   repository: {
    //     id: 654321,
    //     node_id: 'MDEwOlJlcG9zaXRvcnk2NTQzMjE=',
    //     name: 'dummy-repo',
    //     full_name: 'dummy-org/dummy-repo',
    //     html_url: 'https://github.com/dummy-org/dummy-repo'
    //   },
    //   sender: {
    //     login: 'dummy-sender',
    //     id: 567890,
    //     node_id: 'MDQ6VXNlcjU2Nzg5MA==',
    //     avatar_url: 'https://avatars.githubusercontent.com/u/567890?v=4',
    //     html_url: 'https://github.com/dummy-sender'
    //   }
    // }

    if (!pr_context) {
      throw new Error('Pull request context is not available')
    }

    const pull_request = new PullRequest(pr_context)
    await pull_request.getDiffString()

    const reviewer = new AIReviewer(pull_request)
    await reviewer.formatPrChanges()

    console.log('Formatted changes are:', reviewer.formatted_changes)

    const openai_interface = new OpenAIInterface(OPENAI_KEY, GPT_MODEL)
    const comments_list = await openai_interface.getCommentsonPR({
      title: pr_context.title,
      description: pr_context.body,
      changes: reviewer.formatted_changes
    })

    console.log('Comments are:', comments_list)
    await pull_request.addReview(comments_list)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      core.setFailed(error.message)
    } else {
      console.error('An unknown error occurred', error)
      core.setFailed('An unknown error occurred')
    }
  }
}
