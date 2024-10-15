import { Rule } from '~/rules';
import { VALIDATION_ERROR_ARRAY_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsArrayRule extends Rule<any[]> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_ARRAY_MESSAGES.NOT_AN_ARRAY);
  }

  validate(value: any): ValidationResult {
    const valid = Array.isArray(value);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
