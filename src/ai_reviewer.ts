import { PullRequest } from './pull_request'

interface FormattedChange {
  filename: string
  diff: string[]
}

class AIReviewer {
  private pull_request: PullRequest
  public formatted_changes: FormattedChange[]

  constructor(pull_request: PullRequest) {
    this.pull_request = pull_request
    this.formatted_changes = []
  }

  async getIgnoreList(): Promise<string[]> {
    const content = await this.pull_request.getFileContent('.reviewignore')
    return content
      .split('\n')
      .filter(line => !line.startsWith('#') && line.trim() !== '')
  }

  shouldIgnoreFile(filename: string, files_to_ignore: string[]): boolean {
    return files_to_ignore.some(
      pattern => filename === pattern || filename.startsWith(pattern)
    )
  }

  async formatPrChanges(): Promise<FormattedChange[]> {
    const raw_diff_string = await this.pull_request.getDiffString()
    const files_to_ignore = await this.getIgnoreList()
    const diff_lines = raw_diff_string.split('\n')
    let current_file = ''
    let current_diff: string[] = []
    this.formatted_changes = []

    for (const line of diff_lines) {
      if (line.startsWith('diff --git')) {
        if (
          current_file !== '' &&
          !this.shouldIgnoreFile(current_file, files_to_ignore)
        ) {
          this.formatted_changes.push({
            filename: current_file,
            diff: current_diff
          })
        }
        current_file = line.split(' b/')[1] || ''
        current_diff = []
      }
      if (current_file) {
        current_diff.push(line)
      }
    }
    if (
      current_file !== '' &&
      !this.shouldIgnoreFile(current_file, files_to_ignore)
    ) {
      this.formatted_changes.push({
        filename: current_file,
        diff: current_diff
      })
    }
    return this.formatted_changes
  }
}

export { AIReviewer }
