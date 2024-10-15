import { Rule } from '~/rules';
import { VALIDATION_ERROR_FILE_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class MaxFilesSizeRule extends Rule<File[]> {
  private readonly maxSize: number;

  constructor(maxSize: number, message?: string) {
    super(message || VALIDATION_ERROR_FILE_MESSAGES.MAX_FILES_SIZE);
    this.maxSize = maxSize;
  }

  validate(value: File[]): ValidationResult {
    const totalSize = value.reduce((acc, file) => acc + file.size, 0);
    const valid = totalSize <= this.maxSize;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
