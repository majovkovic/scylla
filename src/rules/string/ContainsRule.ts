import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class ContainsRule extends Rule<string> {
  private readonly substring: string;

  constructor(substring: string, message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.CONTAINS(substring));
    this.substring = substring;
  }

  validate(value: string): ValidationResult {
    const valid = value.includes(this.substring);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
