import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class MaxLengthRule extends Rule<string> {
  private readonly max: number;

  constructor(max: number, message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.MAX_LENGTH(max));
    this.max = max;
  }

  validate(value: string): ValidationResult {
    const valid = value.length <= this.max;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
