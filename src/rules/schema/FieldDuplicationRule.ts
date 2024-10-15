import { ValidationResult } from '~/types';

export class FieldDuplicationRule {
  private readonly fields: string[];
  private readonly message: string;

  constructor(fields: string[], message?: string) {
    this.fields = fields;
    this.message = message || `Fields must not have duplicate values`;
  }

  validate(data: Map<string, any>): ValidationResult {
    const uniqueValues = new Set<string>();
    const duplicates = this.fields.filter((field) => {
      const value = data.get(field);
      if (value && uniqueValues.has(value)) {
        return true;
      }
      uniqueValues.add(value);
      return false;
    });

    return {
      valid: duplicates.length === 0,
      errors: duplicates.length ? [this.message] : undefined,
    };
  }
}
