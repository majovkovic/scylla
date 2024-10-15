import { Rule } from '~/rules';
import { VALIDATION_ERROR_NUMBER_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class MaxNumberRule extends Rule<number> {
  private readonly max: number;

  constructor(max: number, message?: string) {
    super(message || VALIDATION_ERROR_NUMBER_MESSAGES.MAX(max));
    this.max = max;
  }

  validate(value: number): ValidationResult {
    const valid = value <= this.max;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
