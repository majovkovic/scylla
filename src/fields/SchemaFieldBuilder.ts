import {
  AggregateConstraintRule,
  AtLeastOneFieldRequiredRule,
  CrossFieldDependencyRule,
  FieldDuplicationRule,
  GroupValidationRule,
  MutualExclusivityRule,
} from '~/rules/schema';
import { ObjectSchema } from '~/core';
import { Rule } from '~/rules';

export class SchemaFieldBuilder extends ObjectSchema {
  constructor(
    fields: Map<string, { name: string; type: string; rules: Rule<any>[] }>,
  ) {
    super(fields, []);
  }

  /**
   * Ensures that the sum of values in the specified fields meets or exceeds the given threshold.
   */
  aggregateConstraint(fields: string[], threshold: number, message?: string) {
    this.addSchemaRule(new AggregateConstraintRule(fields, threshold, message));
    return this;
  }

  /**
   *  Ensures that at least one of the specified fields is present in the schema.
   */
  atLeastOneFieldRequired(fields: string[], message?: string) {
    this.addSchemaRule(new AtLeastOneFieldRequiredRule(fields, message));
    return this;
  }

  /**
   * Validates that a dependent field has a valid value when a primary field has a certain value.
   */
  crossFieldDependency(
    primaryField: string,
    dependentField: string,
    message?: string,
  ) {
    this.addSchemaRule(
      new CrossFieldDependencyRule(primaryField, dependentField, message),
    );
    return this;
  }

  /**
   * Ensures that the values across the specified fields are unique and not duplicated.
   */
  fieldDuplication(fields: string[], message?: string) {
    this.addSchemaRule(new FieldDuplicationRule(fields, message));
    return this;
  }

  /**
   * Adds a rule that validates a group of fields together, ensuring they meet specific conditions as a group.
   */
  groupValidation(fields: string[], message?: string) {
    this.addSchemaRule(new GroupValidationRule(fields, message));
    return this;
  }

  /**
   * Ensures that only one field from the specified set is provided at any given time.
   */
  mutualExclusivity(fields: string[], message?: string) {
    this.addSchemaRule(new MutualExclusivityRule(fields, message));
    return this;
  }

  private addSchemaRule(rule: any) {
    this.schemaRules.push(rule);
  }
}
