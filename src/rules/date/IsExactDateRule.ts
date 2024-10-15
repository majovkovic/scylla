import { Rule } from '~/rules';
import { VALIDATION_ERROR_DATE_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsExactDateRule extends Rule<string> {
  private exactDate: string;

  constructor(exactDate: string, message?: string) {
    super(message || VALIDATION_ERROR_DATE_MESSAGES.IS_EXACT(exactDate));
    this.exactDate = exactDate;
  }

  validate(value: string): ValidationResult {
    const valid =
      new Date(value).toDateString() ===
      new Date(this.exactDate).toDateString();
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
