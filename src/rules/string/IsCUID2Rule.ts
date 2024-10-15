import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsCUID2Rule extends Rule<string> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.IS_CUID2);
  }

  validate(value: string): ValidationResult {
    const valid = /^[^\s-]{25,}$/.test(value);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
