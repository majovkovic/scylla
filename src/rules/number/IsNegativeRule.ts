import { Rule } from '~/rules';
import { VALIDATION_ERROR_NUMBER_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsNegativeRule extends Rule<number> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_NUMBER_MESSAGES.IS_NEGATIVE);
  }

  validate(value: number): ValidationResult {
    const valid = value < 0;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
