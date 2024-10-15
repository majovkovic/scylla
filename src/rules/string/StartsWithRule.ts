import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class StartsWithRule extends Rule<string> {
  private readonly start: string;

  constructor(start: string, message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.STARTS_WITH(start));
    this.start = start;
  }

  validate(value: string): ValidationResult {
    const valid = value.startsWith(this.start);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
