import { Rule } from '~/rules';
import { VALIDATION_ERROR_RECORD_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class HasKeyRule extends Rule<any> {
  private readonly key: string;

  constructor(key: string, message?: string) {
    super(message || VALIDATION_ERROR_RECORD_MESSAGES.HAS_KEY(key));
    this.key = key;
  }

  validate(value: any): ValidationResult {
    const valid =
      value !== null && Object.prototype.hasOwnProperty.call(value, this.key);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
