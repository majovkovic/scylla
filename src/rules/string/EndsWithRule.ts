import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class EndsWithRule extends Rule<string> {
  private readonly end: string;

  constructor(end: string, message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.ENDS_WITH(end));
    this.end = end;
  }

  validate(value: string): ValidationResult {
    const valid = value.endsWith(this.end);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
