import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsAlphaNumericRule extends Rule<string> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.IS_ALPHA_NUMERIC);
  }

  validate(value: string): ValidationResult {
    const valid = /^[A-Za-z0-9]+$/.test(value);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
