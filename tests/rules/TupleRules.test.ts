import { describe, it, expect } from 'vitest';
import { scylla } from '../../src';
import { VALIDATION_ERROR_TUPLE_MESSAGES } from '../../src/constants/validationErrors';

describe('TupleField - Validation Rules', () => {
  it('should pass the IsTupleRule when the value is a tuple with the correct length', () => {
    const schema = scylla.object({
      value: scylla.tuple(3),
    });

    const data = { value: [1, 2, 3] };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsTupleRule when the value is not a tuple or has an incorrect length', () => {
    const schema = scylla.object({
      value: scylla.tuple(3),
    });

    const data = { value: [1, 2] };
    const errors = scylla.validate(schema, data);

    expect(errors.value).toContain(VALIDATION_ERROR_TUPLE_MESSAGES.IS_TUPLE(3));
  });

  it('should pass the TupleElementTypeRule when the tuple elements match the specified types', () => {
    const schema = scylla.object({
      value: scylla.tuple(3).elementTypes(['number', 'string', 'boolean']),
    });

    const data = { value: [1, 'two', true] };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the TupleElementTypeRule when the tuple elements do not match the specified types', () => {
    const schema = scylla.object({
      value: scylla.tuple(3).elementTypes(['number', 'string', 'boolean']),
    });

    const data = { value: [1, 'two', 'false'] };
    const errors = scylla.validate(schema, data);

    expect(errors.value).toContain(
      VALIDATION_ERROR_TUPLE_MESSAGES.TUPLE_ELEMENT_TYPE,
    );
  });
});
