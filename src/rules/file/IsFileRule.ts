import { Rule } from '~/rules';
import { VALIDATION_ERROR_FILE_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsFileRule extends Rule<File[]> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_FILE_MESSAGES.IS_FILE);
  }

  validate(value: any): ValidationResult {
    const valid =
      Array.isArray(value) && value.every((item) => item instanceof File);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
