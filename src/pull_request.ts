import { getOctokit } from '@actions/github';
import * as core from '@actions/core';

// Retrieve the GitHub token
const GITHUB_TOKEN = core.getInput('github-token');
if (!GITHUB_TOKEN) {
  // Log critical error if the token is missing right at the start
  throw new Error('GitHub token not provided.');
}

class PullRequest {
  private octokitInstance;
  private repo_owner: string;
  private repo_name: string;
  private pr_number: number;
  private pr_branch_name: string;
  private pr_base_branch_name: string;
  private pr_title: string;
  private pr_body: string;
  private diff_string?: string;

  constructor(pr_context: any) {
    this.octokitInstance = getOctokit(GITHUB_TOKEN);
    this.repo_owner = pr_context.pull_request.base.repo.owner.login;
    this.repo_name = pr_context.pull_request.base.repo.name;
    this.pr_number = pr_context.number;
    this.pr_branch_name = pr_context.pull_request.head.ref;
    this.pr_base_branch_name = pr_context.pull_request.base.ref;
    this.pr_title = pr_context.pull_request.title;
    this.pr_body = pr_context.pull_request.body;
  }

  async getDiffString(): Promise<string> {
    try {
      const response = await this.octokitInstance.rest.pulls.get({
        owner: this.repo_owner,
        repo: this.repo_name,
        pull_number: this.pr_number,
        mediaType: { format: 'diff' }
      });
      this.diff_string = response.data as unknown as string;
      return this.diff_string;
    } catch (error) {
      core.error(`Error while fetching diff string: ${error}`);
      throw error;
    }
  }

  async getFileContent(file_path: string): Promise<string> {
    try {
      const response = await this.octokitInstance.rest.repos.getContent({
        owner: this.repo_owner,
        repo: this.repo_name,
        path: file_path,
        ref: this.pr_branch_name,
        mediaType: { format: 'raw' }
      });
      return (response.data as any).content as string;
    } catch (error) {
      core.error(`Error while fetching file content: ${error}`);
      throw error;
    }
  }

  async addReview(list_of_comments: { path: string; position: number; body: string }[]): Promise<void> {
    if (list_of_comments.length === 0) {
      console.log('No comments to add');
      return;
    }
    try {
      const response = await this.octokitInstance.rest.pulls.createReview({
        owner: this.repo_owner,
        repo: this.repo_name,
        pull_number: this.pr_number,
        event: 'COMMENT',
        comments: list_of_comments
      });
      if (response.status !== 200) {
        throw new Error('Failed to add review');
      }
    } catch (error) {
      core.error(`Error while adding review: ${error}`);
      throw error;
    }
  }
}

export { PullRequest };