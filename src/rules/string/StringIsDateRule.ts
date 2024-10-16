import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class StringIsDateRule extends Rule<string> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.IS_DATE);
  }

  validate(value: string): ValidationResult {
    const valid = !isNaN(Date.parse(value));
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
