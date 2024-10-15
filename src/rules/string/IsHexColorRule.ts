import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsHexColorRule extends Rule<string> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.IS_HEX_COLOR);
  }

  validate(value: string): ValidationResult {
    const valid = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/i.test(value);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
