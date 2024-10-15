import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsULIDRule extends Rule<string> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.IS_ULID);
  }

  validate(value: string): ValidationResult {
    const valid = /^[0-9A-HJKMNP-TV-Z]{26}$/.test(value);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
