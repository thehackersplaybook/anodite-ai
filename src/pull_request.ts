// This file is no longer used in the GitHub App version
// The pull request logic is now handled in api/webhook.js

export class PullRequest {
  constructor() {
    console.log('PullRequest class - legacy version for GitHub Actions');
  }

  async getDiffString(): Promise<string> {
    throw new Error('This method is not used in GitHub App mode');
  }

  async getFileContent(): Promise<string> {
    throw new Error('This method is not used in GitHub App mode');
  }

  async addReview(): Promise<void> {
    throw new Error('This method is not used in GitHub App mode');
  }
}