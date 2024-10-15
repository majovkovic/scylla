import { Rule } from '~/rules';
import { VALIDATION_ERROR_RECORD_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class HasKeysRule extends Rule<any> {
  private readonly keys: string[];

  constructor(keys: string[], message?: string) {
    super(message || VALIDATION_ERROR_RECORD_MESSAGES.HAS_KEYS(keys));
    this.keys = keys;
  }

  validate(value: any): ValidationResult {
    const valid = this.keys.every((key) =>
      Object.prototype.hasOwnProperty.call(value, key),
    );
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
