import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsNanoidRule extends Rule<string> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.IS_NANOID);
  }

  validate(value: string): ValidationResult {
    const valid = /^[A-Za-z0-9_-]{21}$/.test(value);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
