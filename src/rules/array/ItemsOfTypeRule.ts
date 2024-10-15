import { Rule } from '~/rules';
import { VALIDATION_ERROR_ARRAY_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class ItemsOfTypeRule extends Rule<any[]> {
  private readonly type: string;

  constructor(type: string, message?: string) {
    super(message || VALIDATION_ERROR_ARRAY_MESSAGES.ITEMS_OF_TYPE(type));
    this.type = type;
  }

  validate(value: any[]): ValidationResult {
    if (this.type === 'any') {
      return { valid: true };
    }

    const valid = value.every((item) => typeof item === this.type);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
