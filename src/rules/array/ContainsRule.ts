import { Rule } from '~/rules';
import { VALIDATION_ERROR_ARRAY_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class ContainsRule extends Rule<any[]> {
  private readonly item: any;

  constructor(item: any, message?: string) {
    super(message || VALIDATION_ERROR_ARRAY_MESSAGES.CONTAINS);
    this.item = item;
  }

  validate(value: any[]): ValidationResult {
    const valid = value.includes(this.item);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
