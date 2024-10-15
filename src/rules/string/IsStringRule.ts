import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsStringRule extends Rule<string> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.IS_STRING);
  }

  validate(value: any): ValidationResult {
    const valid = typeof value === 'string';
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
