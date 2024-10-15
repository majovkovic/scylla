import { Rule } from '~/rules';
import { VALIDATION_ERROR_SHARED_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsMatchRule extends Rule<any> {
  private readonly compareToField: string;

  constructor(compareToField: any, message?: string) {
    super(message || VALIDATION_ERROR_SHARED_MESSAGES.IS_MATCH(compareToField));
    this.compareToField = compareToField;
  }

  validate(value: any, allData?: Record<string, any>): ValidationResult {
    if (!allData) {
      return { valid: false, errors: ['No data available for comparison'] };
    }

    const compareToValue = allData[this.compareToField];
    const valid = value === compareToValue;

    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
