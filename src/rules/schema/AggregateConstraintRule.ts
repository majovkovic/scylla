import { ValidationResult } from '~/types';

export class AggregateConstraintRule {
  private readonly fields: string[];
  private readonly threshold: number;
  private readonly message: string;

  constructor(fields: string[], threshold: number, message?: string) {
    this.fields = fields;
    this.threshold = threshold;
    this.message =
      message || `The sum of the fields must be at least ${threshold}`;
  }

  validate(data: Map<string, any>): ValidationResult {
    const total = this.fields.reduce((sum, field) => {
      const value = data.get(field) || 0;
      return sum + parseFloat(value);
    }, 0);

    const valid = total >= this.threshold;
    return { valid, errors: valid ? undefined : [this.message] };
  }
}
