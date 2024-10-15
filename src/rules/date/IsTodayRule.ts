import { Rule } from '~/rules';
import { VALIDATION_ERROR_DATE_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsTodayRule extends Rule<string> {
  constructor(message?: string) {
    super(message || VALIDATION_ERROR_DATE_MESSAGES.IS_TODAY);
  }

  validate(value: string): ValidationResult {
    const today = new Date();
    const inputDate = new Date(value);
    const valid = inputDate.toDateString() === today.toDateString();
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
