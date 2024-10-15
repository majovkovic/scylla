import { Rule } from '~/rules';
import { VALIDATION_ERROR_NUMBER_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsNumberRule extends Rule<number> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_NUMBER_MESSAGES.NOT_A_NUMBER);
  }

  validate(value: any): ValidationResult {
    const valid = typeof value === 'number' && !isNaN(value);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
