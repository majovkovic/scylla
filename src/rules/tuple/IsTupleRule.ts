import { Rule } from '~/rules';
import { VALIDATION_ERROR_TUPLE_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class IsTupleRule extends Rule<any[]> {
  private readonly length: number;

  constructor(length: number, message?: string) {
    super(message || VALIDATION_ERROR_TUPLE_MESSAGES.IS_TUPLE(length));
    this.length = length;
  }

  validate(value: any[]): ValidationResult {
    const valid = Array.isArray(value) && value.length === this.length;
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
