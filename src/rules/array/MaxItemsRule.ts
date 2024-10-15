import { Rule } from '~/rules';
import { VALIDATION_ERROR_ARRAY_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class MaxItemsRule extends Rule<any[]> {
  private readonly max: number;

  constructor(max: number, message?: string) {
    super(message || VALIDATION_ERROR_ARRAY_MESSAGES.MAX_ITEMS(max));
    this.max = max;
  }

  validate(value: any[]): ValidationResult {
    const valid = value.length <= this.max;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
