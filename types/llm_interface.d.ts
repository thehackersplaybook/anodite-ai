interface CodeChanges {
  title: string
  description: string
  changes: any
}
declare class OpenAIInterface {
  private gpt_model
  private openai
  constructor(api_key: string, gpt_model: string)
  getCommentsonPR(code_changes: CodeChanges): Promise<any[]>
}
export { OpenAIInterface }
