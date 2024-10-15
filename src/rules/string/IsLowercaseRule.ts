import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsLowercaseRule extends Rule<string> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.IS_LOWERCASE);
  }

  validate(value: string): ValidationResult {
    const valid = value === value.toLowerCase();
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
