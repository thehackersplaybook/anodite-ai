export declare function getAllReferences(
  owner: string,
  repo: string,
  branch_name: string,
  list_of_queries: string[],
  file_paths_to_review: string[],
  file_paths_to_ignore: string[]
): Promise<
  {
    path: string
    content: string
  }[]
>
