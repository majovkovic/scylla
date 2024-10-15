import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsAlphaRule extends Rule<string> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.IS_ALPHA);
  }

  validate(value: string): ValidationResult {
    const valid = /^[A-Za-z]+$/.test(value);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
