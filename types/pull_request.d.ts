declare class PullRequest {
    private repo_owner;
    private repo_name;
    private pr_number;
    private pr_branch_name;
    private pr_base_branch_name;
    private pr_title;
    private pr_body;
    private diff_string?;
    constructor(pr_context: any);
    getDiffString(): Promise<string>;
    getFileContent(file_path: string): Promise<string>;
    addReview(list_of_comments: {
        path: string;
        position: number;
        body: string;
    }[]): Promise<void>;
}
export { PullRequest };
