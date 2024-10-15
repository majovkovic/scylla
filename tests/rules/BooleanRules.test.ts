import { describe, it, expect } from 'vitest';
import { scylla } from '~/index';
import { VALIDATION_ERROR_BOOLEAN_MESSAGES } from '~/constants/validationErrors';

describe('BooleanField - Validation Rules', () => {
  it('should pass the IsBooleanRule when the value is a boolean', () => {
    const schema = scylla.object({
      field: scylla.boolean(),
    });

    const data = { field: true };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsBooleanRule when the value is not a boolean', () => {
    const schema = scylla.object({
      field: scylla.boolean(),
    });

    const data = { field: 'not a boolean' };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(
      VALIDATION_ERROR_BOOLEAN_MESSAGES.NOT_A_BOOLEAN,
    );
  });

  it('should pass the IsTrueRule when the value is true', () => {
    const schema = scylla.object({
      field: scylla.boolean().true(),
    });

    const data = { field: true };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsTrueRule when the value is false', () => {
    const schema = scylla.object({
      field: scylla.boolean().true(),
    });

    const data = { field: false };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(VALIDATION_ERROR_BOOLEAN_MESSAGES.IS_TRUE);
  });

  it('should pass the IsFalseRule when the value is false', () => {
    const schema = scylla.object({
      field: scylla.boolean().false(),
    });

    const data = { field: false };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsFalseRule when the value is true', () => {
    const schema = scylla.object({
      field: scylla.boolean().false(),
    });

    const data = { field: true };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(VALIDATION_ERROR_BOOLEAN_MESSAGES.IS_FALSE);
  });
});
