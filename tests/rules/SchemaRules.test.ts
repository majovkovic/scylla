import { describe, it, expect } from 'vitest';
import { scylla } from '~/index';

describe('Schema-Level Validation Rules', () => {
  it('should pass the AggregateConstraintRule when the sum of fields meets the threshold', () => {
    const schema = scylla
      .object({
        field1: scylla.number(),
        field2: scylla.number(),
      })
      .aggregateConstraint(['field1', 'field2'], 10);

    const data = { field1: 6, field2: 5 };
    const errors = scylla.validate(schema, data);
    expect(errors).toEqual({});
  });

  it('should fail the AggregateConstraintRule when the sum of fields is below the threshold', () => {
    const schema = scylla
      .object({
        field1: scylla.number(),
        field2: scylla.number(),
      })
      .aggregateConstraint(['field1', 'field2'], 10);

    const data = { field1: 3, field2: 5 };
    const errors = scylla.validate(schema, data);
    expect(errors).toHaveProperty('schema');
    expect(errors.schema).toContain(
      'The sum of the fields must be at least 10',
    );
  });

  it('should pass the AtLeastOneFieldRequiredRule when at least one field is filled', () => {
    const schema = scylla
      .object({
        field1: scylla.string().min(3),
        field2: scylla.string().max(18),
      })
      .atLeastOneFieldRequired(['field1', 'field2']);

    const data = { field1: 'value' };
    const errors = scylla.validate(schema, data);
    expect(errors).toEqual({});
  });

  it('should fail the AtLeastOneFieldRequiredRule when no fields are filled', () => {
    const schema = scylla
      .object({
        field1: scylla.string(),
        field2: scylla.string(),
      })
      .atLeastOneFieldRequired(['field1', 'field2']);

    const data = {};
    const errors = scylla.validate(schema, data);
    expect(errors).toHaveProperty('schema');
    expect(errors.schema).toContain(
      'At least one of the fields must be filled',
    );
  });

  it('should pass the CrossFieldDependencyRule when both fields are filled correctly', () => {
    const schema = scylla
      .object({
        primaryField: scylla.string(),
        dependentField: scylla.string(),
      })
      .crossFieldDependency('primaryField', 'dependentField');

    const data = { primaryField: 'value', dependentField: 'value' };
    const errors = scylla.validate(schema, data);
    expect(errors).toEqual({});
  });

  it('should fail the CrossFieldDependencyRule when the primary field is filled but the dependent field is missing', () => {
    const schema = scylla
      .object({
        primaryField: scylla.string(),
        dependentField: scylla.string(),
      })
      .crossFieldDependency('primaryField', 'dependentField');

    const data = { primaryField: 'value' };
    const errors = scylla.validate(schema, data);
    expect(errors).toHaveProperty('schema');
    expect(errors.schema).toContain(
      'Field dependentField must be filled when primaryField has a value',
    );
  });

  it('should pass the GroupValidationRule when all fields in the group are filled', () => {
    const schema = scylla
      .object({
        field1: scylla.string(),
        field2: scylla.string(),
      })
      .groupValidation(['field1', 'field2']);

    const data = { field1: 'a', field2: 'b' };
    const errors = scylla.validate(schema, data);
    expect(errors).toEqual({});
  });

  it('should fail the GroupValidationRule when one field in the group is filled but others are missing', () => {
    const schema = scylla
      .object({
        field1: scylla.string(),
        field2: scylla.string(),
      })
      .groupValidation(['field1', 'field2']);

    const data = { field1: 'a' };
    const errors = scylla.validate(schema, data);
    expect(errors).toHaveProperty('schema');
    expect(errors.schema).toContain(
      'All fields in the group must be filled if one is filled',
    );
  });

  it('should pass the MutualExclusivityRule when only one field is filled', () => {
    const schema = scylla
      .object({
        field1: scylla.string(),
        field2: scylla.string(),
      })
      .mutualExclusivity(['field1', 'field2']);

    const data = { field1: 'a' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the MutualExclusivityRule when more than one field is filled', () => {
    const schema = scylla
      .object({
        field1: scylla.string(),
        field2: scylla.string(),
      })
      .mutualExclusivity(['field1', 'field2']);

    const data = { field1: 'a', field2: 'b' };
    const errors = scylla.validate(schema, data);
    expect(errors).toHaveProperty('schema');
    expect(errors.schema).toContain('Only one of the fields can be filled');
  });

  it('should pass the FieldDuplicationRule when no duplicate values are found', () => {
    const schema = scylla
      .object({
        field1: scylla.string(),
        field2: scylla.string(),
      })
      .fieldDuplication(['field1', 'field2']);

    const data = { field1: 'a', field2: 'b' };
    const errors = scylla.validate(schema, data);
    expect(errors).toEqual({});
  });

  it('should fail the FieldDuplicationRule when duplicate values are found', () => {
    const schema = scylla
      .object({
        field1: scylla.string(),
        field2: scylla.string(),
      })
      .fieldDuplication(['field1', 'field2']);

    const data = { field1: 'a', field2: 'a' };
    const errors = scylla.validate(schema, data);
    expect(errors).toHaveProperty('schema');
    expect(errors.schema).toContain('Fields must not have duplicate values');
  });
});
