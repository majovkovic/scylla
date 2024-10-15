import { Rule } from '~/rules';
import { VALIDATION_ERROR_SHARED_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsEmptyRule extends Rule<any> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_SHARED_MESSAGES.IS_EMPTY);
  }

  validate(value: any): ValidationResult {
    const valid = value === '' || value === null || value === undefined;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
