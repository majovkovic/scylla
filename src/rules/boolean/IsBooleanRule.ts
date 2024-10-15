import { Rule } from '~/rules';
import { VALIDATION_ERROR_BOOLEAN_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsBooleanRule extends Rule<any> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_BOOLEAN_MESSAGES.NOT_A_BOOLEAN);
  }

  validate(value: any): ValidationResult {
    const valid = typeof value === 'boolean';
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
