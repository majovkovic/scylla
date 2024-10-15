import { Rule } from '~/rules';
import { VALIDATION_ERROR_FILE_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsFileTypeRule extends Rule<File[]> {
  private readonly allowedTypes: string[];

  constructor(allowedTypes: string[], message?: string) {
    super(message || VALIDATION_ERROR_FILE_MESSAGES.IS_FILE_TYPE);
    this.allowedTypes = allowedTypes;
  }

  validate(value: File[]): ValidationResult {
    const valid = value.every((file) => this.allowedTypes.includes(file.type));
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
