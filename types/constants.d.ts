declare const PROMPT_FOR_PR_REVIEW: string;
declare const PROMPT_FOR_MORE_INFO: string;
declare class ModelNames {
    static models: Record<string, string>;
    static isModelValid(model_name: string): boolean;
}
export { PROMPT_FOR_PR_REVIEW, PROMPT_FOR_MORE_INFO, ModelNames };
