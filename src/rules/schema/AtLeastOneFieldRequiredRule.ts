export class AtLeastOneFieldRequiredRule {
  readonly fields: string[];
  private readonly message: string;

  constructor(fields: string[], message?: string) {
    this.fields = fields;
    this.message = message || `At least one of the fields must be filled`;
  }

  validate(data: Map<string, any>): {
    valid: boolean;
    fields?: string[];
    errors?: string[];
  } {
    const isAnyFieldFilled = this.fields.some((field) => !!data.get(field));

    if (isAnyFieldFilled) {
      return { valid: true, fields: this.fields };
    }

    return { valid: false, errors: [this.message] };
  }
}
