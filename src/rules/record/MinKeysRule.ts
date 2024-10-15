import { Rule } from '~/rules';
import { VALIDATION_ERROR_RECORD_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class MinKeysRule extends Rule<any> {
  private readonly min: number;

  constructor(min: number, message?: string) {
    super(message || VALIDATION_ERROR_RECORD_MESSAGES.MIN_KEYS(min));
    this.min = min;
  }

  validate(value: any): ValidationResult {
    const valid = Object.keys(value).length >= this.min;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
