import { Rule } from '~/rules';
import { VALIDATION_ERROR_DATE_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsBeforeDateRule extends Rule<string> {
  private readonly beforeDate: string;

  constructor(beforeDate: string, message?: string) {
    super(message || VALIDATION_ERROR_DATE_MESSAGES.IS_BEFORE(beforeDate));
    this.beforeDate = beforeDate;
  }

  validate(value: string): ValidationResult {
    const valid = new Date(value) < new Date(this.beforeDate);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
