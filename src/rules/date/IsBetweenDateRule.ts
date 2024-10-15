import { Rule } from '~/rules';
import { VALIDATION_ERROR_DATE_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsBetweenDatesRule extends Rule<string> {
  private readonly startDate: string;
  private readonly endDate: string;

  constructor(startDate: string, endDate: string, message?: string) {
    super(
      message || VALIDATION_ERROR_DATE_MESSAGES.IS_BETWEEN(startDate, endDate),
    );
    this.startDate = startDate;
    this.endDate = endDate;
  }

  validate(value: string): ValidationResult {
    const dateValue = new Date(value);
    const valid =
      dateValue > new Date(this.startDate) &&
      dateValue < new Date(this.endDate);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
