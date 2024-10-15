import { Rule } from '~/rules';
import { VALIDATION_ERROR_DATE_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsAfterDateRule extends Rule<string> {
  private readonly afterDate: string;

  constructor(afterDate: string, message?: string) {
    super(message || VALIDATION_ERROR_DATE_MESSAGES.IS_AFTER(afterDate));
    this.afterDate = afterDate;
  }

  validate(value: string): ValidationResult {
    const valid = new Date(value) > new Date(this.afterDate);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
