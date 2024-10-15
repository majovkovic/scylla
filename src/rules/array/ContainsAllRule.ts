import { Rule } from '~/rules';
import { VALIDATION_ERROR_ARRAY_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class ContainsAllRule extends Rule<any[]> {
  private items: any[];

  constructor(items: any[], message?: string) {
    super(message || VALIDATION_ERROR_ARRAY_MESSAGES.CONTAINS_ALL);
    this.items = items;
  }

  validate(value: any[]): ValidationResult {
    const valid = this.items.every((item) => value.includes(item));
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
