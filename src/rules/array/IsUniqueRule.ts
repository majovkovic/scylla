import { Rule } from '~/rules';
import { VALIDATION_ERROR_ARRAY_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsUniqueRule extends Rule<any[]> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_ARRAY_MESSAGES.IS_UNIQUE);
  }

  validate(value: any[]): ValidationResult {
    const valid = new Set(value).size === value.length;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
