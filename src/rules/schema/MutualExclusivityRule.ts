import { ValidationResult } from '~/types';

export class MutualExclusivityRule {
  readonly fields: string[];
  private readonly message: string;

  constructor(fields: string[], message?: string) {
    this.fields = fields;
    this.message = message || `Only one of the fields can be filled`;
  }

  validate(data: Map<string, any>): ValidationResult {
    const filledFields = this.fields.filter((field) => !!data.get(field));

    return {
      valid: filledFields.length <= 1,
      errors: filledFields.length > 1 ? [this.message] : undefined,
    };
  }
}
