import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsUUIDRule extends Rule<string> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.IS_UUID);
  }

  validate(value: string): ValidationResult {
    const valid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
        value,
      );
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
