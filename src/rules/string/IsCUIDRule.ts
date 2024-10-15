import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsCUIDRule extends Rule<string> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.IS_CUID);
  }

  validate(value: string): ValidationResult {
    const valid = /^c[^\s-]{24,}$/.test(value);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
