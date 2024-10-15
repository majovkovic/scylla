import { Rule } from '~/rules';
import { VALIDATION_ERROR_ARRAY_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class MinItemsRule extends Rule<any[]> {
  private readonly min: number;

  constructor(min: number, message?: string) {
    super(message || VALIDATION_ERROR_ARRAY_MESSAGES.MIN_ITEMS(min));
    this.min = min;
  }

  validate(value: any[]): ValidationResult {
    const valid = value.length >= this.min;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
