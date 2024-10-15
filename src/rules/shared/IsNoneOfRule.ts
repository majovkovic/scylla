import { Rule } from '~/rules';
import { VALIDATION_ERROR_SHARED_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsNoneOfRule extends Rule<any> {
  private readonly invalidValues: any[];

  constructor(invalidValues: any[], message?: string) {
    super(
      message || VALIDATION_ERROR_SHARED_MESSAGES.IS_NONE_OF(invalidValues),
    );
    this.invalidValues = invalidValues;
  }

  validate(value: any): ValidationResult {
    const valid = !this.invalidValues.includes(value);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
