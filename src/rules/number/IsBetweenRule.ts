import { Rule } from '~/rules';
import { VALIDATION_ERROR_NUMBER_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsBetweenRule extends Rule<number> {
  private readonly min: number;
  private readonly max: number;

  constructor(min: number, max: number, message?: string) {
    super(message || VALIDATION_ERROR_NUMBER_MESSAGES.IS_BETWEEN(min, max));
    this.min = min;
    this.max = max;
  }

  validate(value: number): ValidationResult {
    const valid = value >= this.min && value <= this.max;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
