import { PullRequest } from './pull_request';
interface FormattedChange {
    filename: string;
    diff: string[];
}
declare class AIReviewer {
    private pull_request;
    formatted_changes: FormattedChange[];
    constructor(pull_request: PullRequest);
    getIgnoreList(): Promise<string[]>;
    shouldIgnoreFile(filename: string, files_to_ignore: string[]): boolean;
    formatPrChanges(): Promise<FormattedChange[]>;
}
export { AIReviewer };
