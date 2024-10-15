import { ValidationResult } from '~/types';

export class GroupValidationRule {
  private readonly fields: string[];
  private readonly message: string;

  constructor(fields: string[], message?: string) {
    this.fields = fields;
    this.message =
      message || `All fields in the group must be filled if one is filled`;
  }

  validate(data: Map<string, any>): ValidationResult {
    const isAnyFieldFilled = this.fields.some((field) => !!data.get(field));

    if (!isAnyFieldFilled) {
      return { valid: true };
    }

    const missingFields = this.fields.filter((field) => !data.get(field));
    return {
      valid: missingFields.length === 0,
      errors: missingFields.length ? [this.message] : undefined,
    };
  }
}
