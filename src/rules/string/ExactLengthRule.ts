import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class ExactLengthRule extends Rule<string> {
  private readonly length: number;

  constructor(length: number, message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.EXACT_LENGTH(length));
    this.length = length;
  }

  validate(value: string): ValidationResult {
    const valid = value.length === this.length;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
