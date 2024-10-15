import { Rule } from '~/rules';
import { VALIDATION_ERROR_NUMBER_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsIntegerRule extends Rule<number> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_NUMBER_MESSAGES.IS_INTEGER);
  }

  validate(value: number): ValidationResult {
    const valid = Number.isInteger(value);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
