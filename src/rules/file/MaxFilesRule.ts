import { Rule } from '~/rules';
import { VALIDATION_ERROR_FILE_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class MaxFilesRule extends Rule<File[]> {
  private readonly maxFiles: number;

  constructor(maxFiles: number, message?: string) {
    super(message || VALIDATION_ERROR_FILE_MESSAGES.MAX_FILES);
    this.maxFiles = maxFiles;
  }

  validate(value: File[]): ValidationResult {
    const valid = value.length <= this.maxFiles;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
