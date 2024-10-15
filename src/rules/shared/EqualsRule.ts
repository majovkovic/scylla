import { Rule } from '~/rules';
import { VALIDATION_ERROR_SHARED_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class EqualsRule extends Rule<any> {
  private readonly expectedValue: any;

  constructor(expectedValue: any, message?: string) {
    super(message || VALIDATION_ERROR_SHARED_MESSAGES.EQUALS(expectedValue));
    this.expectedValue = expectedValue;
  }

  validate(value: any): ValidationResult {
    const valid = value === this.expectedValue;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
