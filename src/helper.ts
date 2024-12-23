import { Octokit } from '@octokit/rest';
import * as core from '@actions/core';

const octokit = new Octokit({
  auth: core.getInput('github-token'),
});

export function shouldIgnoreFile(filename: string, files_to_ignore: string[]): boolean {
  return files_to_ignore.some(pattern => filename === pattern || filename.startsWith(pattern));
}

export async function getFileContent(owner: string, repo: string, file_path: string, ref: string): Promise<string> {
  const response = await octokit.rest.repos.getContent({
    owner,
    repo,
    path: file_path,
    ref,
    mediaType: { format: 'raw' },
  });

  if (typeof response.data === 'string') {
    return response.data;
  } else if ('content' in response.data) {
    return Buffer.from(response.data.content, 'base64').toString('utf-8');
  }

  throw new Error('Unexpected response format or empty content');
}