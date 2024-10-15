import { Rule } from '~/rules';
import { VALIDATION_ERROR_SHARED_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsRequiredRule extends Rule<any> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_SHARED_MESSAGES.IS_REQUIRED);
  }

  validate(value: any): ValidationResult {
    const valid = value !== undefined && value !== null && value !== '';
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
