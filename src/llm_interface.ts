import OpenAI from 'openai'
import { PROMPT_FOR_PR_REVIEW, ModelNames } from './constants'

interface CodeChanges {
  title: string
  description: string
  changes: any // Replace 'any' with more specific types if possible for your changes structure
}

interface OpenAIChoice {
  message: {
    content: string
  }
}

interface OpenAIResponse {
  choices: OpenAIChoice[]
}

class OpenAIInterface {
  private gpt_model: string
  private openai: OpenAI

  constructor(api_key: string, gpt_model: string) {
    if (!api_key) {
      throw new Error('OpenAI API key is required')
    }
    if (!ModelNames.isModelValid(gpt_model)) {
      throw new Error(
        `Invalid GPT model name: ${gpt_model}. Valid models are: ${Object.values(
          ModelNames.models
        )}`
      )
    }
    this.gpt_model = gpt_model
    this.openai = new OpenAI({
      apiKey: api_key
    })
  }

  async getCommentsonPR(code_changes: CodeChanges): Promise<any[]> {
    // Replace 'any' if you know the type of comments
    const response: any = await this.openai.chat.completions.create({
      model: this.gpt_model,
      messages: [
        {
          role: 'system',
          content: PROMPT_FOR_PR_REVIEW
        },
        {
          role: 'user',
          content: JSON.stringify(code_changes)
        }
      ]
    })

    try {
      const content = response.choices?.[0]?.message?.content
      if (!content) {
        throw new Error('No content returned from OpenAI')
      }
      console.log('Response from OpenAI:', content)
      const more_info_list = JSON.parse(content)
      return more_info_list
    } catch (error) {
      console.log('Error parsing response from OpenAI:', error)
      return []
    }
  }
}

export { OpenAIInterface }
