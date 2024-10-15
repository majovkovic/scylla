import { Rule } from '~/rules';
import { VALIDATION_ERROR_FILE_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class MinFilesRule extends Rule<File[]> {
  private readonly minFiles: number;

  constructor(minFiles: number, message?: string) {
    super(message || VALIDATION_ERROR_FILE_MESSAGES.MIN_FILES);
    this.minFiles = minFiles;
  }

  validate(value: File[]): ValidationResult {
    const valid = value.length >= this.minFiles;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
