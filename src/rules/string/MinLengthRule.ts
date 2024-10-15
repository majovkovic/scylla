import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class MinLengthRule extends Rule<string> {
  private readonly min: number;

  constructor(min: number, message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.MIN_LENGTH(min));
    this.min = min;
  }

  validate(value: string): ValidationResult {
    const valid = value.length >= this.min;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
