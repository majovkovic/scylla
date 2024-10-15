import { Rule } from '~/rules';
import { ValidationResult } from '~/types';

export class CustomValidationRule extends Rule<any> {
  private readonly validateFn: (value: any) => boolean;

  constructor(validateFn: (value: any) => boolean, message?: string) {
    super(message);
    this.validateFn = validateFn;
  }

  validate(value: any): ValidationResult {
    const valid = this.validateFn(value);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
