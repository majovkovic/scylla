import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsURLRule extends Rule<string> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.IS_URL);
  }

  validate(value: string): ValidationResult {
    try {
      new URL(value);
      return { valid: true };
    } catch {
      return { valid: false, errors: [this.message!] };
    }
  }
}
