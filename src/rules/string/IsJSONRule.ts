import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsJSONRule extends Rule<string> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.IS_JSON);
  }

  validate(value: string): ValidationResult {
    try {
      JSON.parse(value);
      return { valid: true };
    } catch {
      return { valid: false, errors: [this.message!] };
    }
  }
}
