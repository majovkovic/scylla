import { Rule } from '~/rules';
import { VALIDATION_ERROR_BOOLEAN_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsTrueRule extends Rule<boolean> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_BOOLEAN_MESSAGES.IS_TRUE);
  }

  validate(value: boolean): ValidationResult {
    const valid = value;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
