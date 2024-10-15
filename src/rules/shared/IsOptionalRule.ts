import { Rule } from '~/rules';
import { ValidationResult } from '~/types';

export class IsOptionalRule extends Rule<any> {
  constructor(message?: string) {
    super(message || '');
  }

  validate(): ValidationResult {
    return { valid: true };
  }
}
