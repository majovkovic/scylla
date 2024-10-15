import { Rule } from '~/rules';
import { VALIDATION_ERROR_RECORD_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class MaxKeysRule extends Rule<any> {
  private readonly max: number;

  constructor(max: number, message?: string) {
    super(message || VALIDATION_ERROR_RECORD_MESSAGES.MAX_KEYS(max));
    this.max = max;
  }

  validate(value: any): ValidationResult {
    const valid = Object.keys(value).length <= this.max;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
