import { Rule } from '~/rules';
import { VALIDATION_ERROR_NUMBER_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsMultipleOfRule extends Rule<number> {
  private readonly divisor: number;

  constructor(divisor: number, message?: string) {
    super(message || VALIDATION_ERROR_NUMBER_MESSAGES.IS_MULTIPLE_OF(divisor));
    this.divisor = divisor;
  }

  validate(value: number): ValidationResult {
    const valid = value % this.divisor === 0;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
