import { describe, it, expect } from 'vitest';
import { scylla } from '~/index';
import { VALIDATION_ERROR_NUMBER_MESSAGES } from '~/constants/validationErrors';

describe('NumberField - Validation Rules', () => {
  it('should pass the IsNumberRule when the value is a number', () => {
    const schema = scylla.object({
      value: scylla.number(),
    });

    const data = { value: 123 };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsNumberRule when the value is not a number', () => {
    const schema = scylla.object({
      value: scylla.number(),
    });

    const data = { value: 'not a number' };
    const errors = scylla.validate(schema, data);

    expect(errors.value).toContain(
      VALIDATION_ERROR_NUMBER_MESSAGES.NOT_A_NUMBER,
    );
  });

  it('should pass the MinNumberRule when the value is greater than or equal to the minimum', () => {
    const schema = scylla.object({
      value: scylla.number().min(10),
    });

    const data = { value: 10 };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the MinNumberRule when the value is less than the minimum', () => {
    const schema = scylla.object({
      value: scylla.number().min(10),
    });

    const data = { value: 5 };
    const errors = scylla.validate(schema, data);

    expect(errors.value).toContain(VALIDATION_ERROR_NUMBER_MESSAGES.MIN(10));
  });

  it('should pass the MaxNumberRule when the value is less than or equal to the maximum', () => {
    const schema = scylla.object({
      value: scylla.number().max(100),
    });

    const data = { value: 50 };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the MaxNumberRule when the value is greater than the maximum', () => {
    const schema = scylla.object({
      value: scylla.number().max(100),
    });

    const data = { value: 150 };
    const errors = scylla.validate(schema, data);

    expect(errors.value).toContain(VALIDATION_ERROR_NUMBER_MESSAGES.MAX(100));
  });

  it('should pass the IsEvenRule when the number is even', () => {
    const schema = scylla.object({
      value: scylla.number().even(),
    });

    const data = { value: 4 };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsEvenRule when the number is odd', () => {
    const schema = scylla.object({
      value: scylla.number().even(),
    });

    const data = { value: 3 };
    const errors = scylla.validate(schema, data);

    expect(errors.value).toContain(VALIDATION_ERROR_NUMBER_MESSAGES.IS_EVEN);
  });

  it('should pass the IsOddRule when the number is odd', () => {
    const schema = scylla.object({
      value: scylla.number().odd(),
    });

    const data = { value: 5 };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsOddRule when the number is even', () => {
    const schema = scylla.object({
      value: scylla.number().odd(),
    });

    const data = { value: 6 };
    const errors = scylla.validate(schema, data);

    expect(errors.value).toContain(VALIDATION_ERROR_NUMBER_MESSAGES.IS_ODD);
  });

  it('should pass the IsFloatRule when the number is a float', () => {
    const schema = scylla.object({
      value: scylla.number().float(),
    });

    const data = { value: 4.5 };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsFloatRule when the number is an integer', () => {
    const schema = scylla.object({
      value: scylla.number().float(),
    });

    const data = { value: 10 };
    const errors = scylla.validate(schema, data);

    expect(errors.value).toContain(VALIDATION_ERROR_NUMBER_MESSAGES.IS_FLOAT);
  });

  it('should pass the IsBetweenRule when the number is between the specified values', () => {
    const schema = scylla.object({
      value: scylla.number().between(10, 20),
    });

    const data = { value: 15 };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsBetweenRule when the number is not between the specified values', () => {
    const schema = scylla.object({
      value: scylla.number().between(10, 20),
    });

    const data = { value: 25 };
    const errors = scylla.validate(schema, data);

    expect(errors.value).toContain(
      VALIDATION_ERROR_NUMBER_MESSAGES.IS_BETWEEN(10, 20),
    );
  });

  it('should pass the IsMultipleOfRule when the number is a multiple of the given value', () => {
    const schema = scylla.object({
      value: scylla.number().multipleOf(5),
    });

    const data = { value: 25 };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsMultipleOfRule when the number is not a multiple of the given value', () => {
    const schema = scylla.object({
      value: scylla.number().multipleOf(5),
    });

    const data = { value: 14 };
    const errors = scylla.validate(schema, data);

    expect(errors.value).toContain(
      VALIDATION_ERROR_NUMBER_MESSAGES.IS_MULTIPLE_OF(5),
    );
  });

  it('should pass the IsPositiveRule when the number is positive', () => {
    const schema = scylla.object({
      value: scylla.number().positive(),
    });

    const data = { value: 10 };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsPositiveRule when the number is negative', () => {
    const schema = scylla.object({
      value: scylla.number().positive(),
    });

    const data = { value: -5 };
    const errors = scylla.validate(schema, data);

    expect(errors.value).toContain(
      VALIDATION_ERROR_NUMBER_MESSAGES.IS_POSITIVE,
    );
  });

  it('should pass the IsNegativeRule when the number is negative', () => {
    const schema = scylla.object({
      value: scylla.number().negative(),
    });

    const data = { value: -10 };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsNegativeRule when the number is positive', () => {
    const schema = scylla.object({
      value: scylla.number().negative(),
    });

    const data = { value: 10 };
    const errors = scylla.validate(schema, data);

    expect(errors.value).toContain(
      VALIDATION_ERROR_NUMBER_MESSAGES.IS_NEGATIVE,
    );
  });

  it('should pass the IsIntegerRule when the value is an integer', () => {
    const schema = scylla.object({
      value: scylla.number().integer(),
    });

    const data = { value: 5 };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsIntegerRule when the value is not an integer', () => {
    const schema = scylla.object({
      value: scylla.number().integer(),
    });

    const data = { value: 5.5 };
    const errors = scylla.validate(schema, data);

    expect(errors.value).toContain(VALIDATION_ERROR_NUMBER_MESSAGES.IS_INTEGER);
  });
});
