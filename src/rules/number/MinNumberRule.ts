import { Rule } from '~/rules';
import { VALIDATION_ERROR_NUMBER_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class MinNumberRule extends Rule<number> {
  private min: number;

  constructor(min: number, message?: string) {
    super(message || VALIDATION_ERROR_NUMBER_MESSAGES.MIN(min));
    this.min = min;
  }

  validate(value: number): ValidationResult {
    const valid = value >= this.min;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
