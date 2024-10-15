import { Rule } from '~/rules';
import { VALIDATION_ERROR_NUMBER_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsOddRule extends Rule<number> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_NUMBER_MESSAGES.IS_ODD);
  }

  validate(value: number): ValidationResult {
    const valid = value % 2 !== 0;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
