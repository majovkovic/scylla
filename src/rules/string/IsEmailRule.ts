import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsEmailRule extends Rule<string> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.IS_EMAIL);
  }

  validate(value: string): ValidationResult {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
