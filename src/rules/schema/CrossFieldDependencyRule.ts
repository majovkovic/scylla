export class CrossFieldDependencyRule {
  private readonly primaryField: string;
  private readonly dependentField: string;
  private readonly message: string;

  constructor(primaryField: string, dependentField: string, message?: string) {
    this.primaryField = primaryField;
    this.dependentField = dependentField;
    this.message =
      message ||
      `Field ${dependentField} must be filled when ${primaryField} has a value`;
  }

  validate(data: Map<string, any>): {
    valid: boolean;
    fields?: string[];
    errors?: string[];
  } {
    const primaryValue = data.get(this.primaryField);
    const dependentValue = data.get(this.dependentField);

    const valid = !primaryValue || !!dependentValue;
    return { valid, errors: valid ? undefined : [this.message] };
  }
}
