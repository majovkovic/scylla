import { Rule } from '~/rules';
import { VALIDATION_ERROR_RECORD_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsRecordRule extends Rule<any> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_RECORD_MESSAGES.IS_RECORD);
  }

  validate(value: any): ValidationResult {
    const valid =
      value !== null && typeof value === 'object' && !Array.isArray(value);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
