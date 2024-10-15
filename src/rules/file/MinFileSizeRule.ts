import { Rule } from '~/rules';
import { VALIDATION_ERROR_FILE_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class MinFileSizeRule extends Rule<File[]> {
  private readonly minSize: number;

  constructor(minSize: number, message?: string) {
    super(message || VALIDATION_ERROR_FILE_MESSAGES.MIN_FILE_SIZE);
    this.minSize = minSize;
  }

  validate(value: File[]): ValidationResult {
    const valid = value.every((file) => file.size >= this.minSize);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
