import { Rule } from '~/rules';
import { VALIDATION_ERROR_DATE_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsPastDateRule extends Rule<string> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_DATE_MESSAGES.IS_PAST);
  }

  validate(value: string): ValidationResult {
    const valid = new Date(value) < new Date();
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
