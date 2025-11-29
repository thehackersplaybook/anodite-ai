import { Octokit } from '@octokit/rest'
import * as core from '@actions/core'
import { shouldIgnoreFile, getFileContent } from './helper'

const octokit = new Octokit({
  auth: core.getInput('github-token')
})

async function getAllFilePathsInRepo(
  owner: string,
  repo: string,
  ref: string = 'HEAD'
): Promise<string[]> {
  const { data } = await octokit.rest.git.getTree({
    owner,
    repo,
    tree_sha: ref,
    recursive: 'true',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  return data.tree
    .filter((file: any) => file.type === 'blob')
    .map((file: any) => file.path || '')
}

export async function getAllReferences(
  owner: string,
  repo: string,
  branch_name: string,
  list_of_queries: string[],
  file_paths_to_review: string[],
  file_paths_to_ignore: string[]
): Promise<{ path: string; content: string }[]> {
  const all_file_paths = await getAllFilePathsInRepo(owner, repo, branch_name)
  console.log('All file paths are: ', all_file_paths)
  console.log('Files to ignore: ', file_paths_to_ignore)
  console.log('Files to review: ', file_paths_to_review)
  const files_to_search: string[] = []
  for (const file of all_file_paths) {
    if (shouldIgnoreFile(file, file_paths_to_ignore)) {
      console.log(`Ignoring file: ${file} because it is in the ignore list`)
      continue
    }
    if (file_paths_to_review.includes(file)) {
      console.log(`File ${file} is in the list of files to review`)
      continue
    }
    files_to_search.push(file)
  }

  console.log('Files to search all queries inside: ', files_to_search)

  const results: { path: string; content: string }[] = []
  for (const query of list_of_queries) {
    console.log('Searching for: ', query)

    for (const file_path of files_to_search) {
      const file_path_exists = results.some(result => result.path === file_path)
      if (file_path_exists) continue

      const file_content = await getFileContent(
        owner,
        repo,
        file_path,
        branch_name
      )
      if (file_content.includes(query)) {
        console.log('Found reference for: ', query, ' in ', file_path)
        results.push({ path: file_path, content: file_content })
      } else {
        console.log('No reference found for: ', query, ' in ', file_path)
      }
    }
  }
  return results
}
