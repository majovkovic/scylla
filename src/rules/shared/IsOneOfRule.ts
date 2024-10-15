import { Rule } from '~/rules';
import { VALIDATION_ERROR_SHARED_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsOneOfRule extends Rule<any> {
  private readonly validValues: any[];

  constructor(validValues: any[], message?: string) {
    super(message || VALIDATION_ERROR_SHARED_MESSAGES.IS_ONE_OF(validValues));
    this.validValues = validValues;
  }

  validate(value: any): ValidationResult {
    const valid = this.validValues.includes(value);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
