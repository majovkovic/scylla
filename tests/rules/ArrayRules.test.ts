import { describe, it, expect } from 'vitest';
import { scylla } from '~/index';
import { VALIDATION_ERROR_ARRAY_MESSAGES } from '~/constants/validationErrors';

describe('ArrayField - Validation Rules', () => {
  it('should pass the IsArrayRule when the value is an array', () => {
    const schema = scylla.object({
      items: scylla.array(),
    });

    const data = { items: [1, 2, 3] };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsArrayRule when the value is not an array', () => {
    const schema = scylla.object({
      items: scylla.array(),
    });

    const data = { items: 'not an array' };
    const errors = scylla.validate(schema, data);

    expect(errors.items).toContain(
      VALIDATION_ERROR_ARRAY_MESSAGES.NOT_AN_ARRAY,
    );
  });

  it('should pass the MinItemsRule when array has the minimum required items', () => {
    const schema = scylla.object({
      items: scylla.array().min(3),
    });

    const data = { items: [1, 2, 3] };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the MinItemsRule when array has fewer than the minimum required items', () => {
    const schema = scylla.object({
      items: scylla.array().min(3),
    });

    const data = { items: [1] };
    const errors = scylla.validate(schema, data);

    expect(errors.items).toContain(
      VALIDATION_ERROR_ARRAY_MESSAGES.MIN_ITEMS(3),
    );
  });

  it('should pass the MaxItemsRule when array has fewer than or equal to maximum items', () => {
    const schema = scylla.object({
      items: scylla.array().max(5),
    });

    const data = { items: [1, 2, 3, 4, 5] };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the MaxItemsRule when array has more than the maximum allowed items', () => {
    const schema = scylla.object({
      items: scylla.array().max(3),
    });

    const data = { items: [1, 2, 3, 4] };
    const errors = scylla.validate(schema, data);

    expect(errors.items).toContain(
      VALIDATION_ERROR_ARRAY_MESSAGES.MAX_ITEMS(3),
    );
  });

  it('should pass the ContainsAllRule when array contains all specified items', () => {
    const schema = scylla.object({
      items: scylla.array().containsAll([1, 2]),
    });

    const data = { items: [1, 2, 3] };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the ContainsAllRule when array does not contain all specified items', () => {
    const schema = scylla.object({
      items: scylla.array().containsAll([1, 4]),
    });

    const data = { items: [1, 2, 3] };
    const errors = scylla.validate(schema, data);

    expect(errors.items).toContain(
      VALIDATION_ERROR_ARRAY_MESSAGES.CONTAINS_ALL,
    );
  });

  it('should pass the ContainsRule when array contains the specified item', () => {
    const schema = scylla.object({
      items: scylla.array().contains(2),
    });

    const data = { items: [1, 2, 3] };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the ContainsRule when array does not contain the specified item', () => {
    const schema = scylla.object({
      items: scylla.array().contains(5),
    });

    const data = { items: [1, 2, 3] };
    const errors = scylla.validate(schema, data);

    expect(errors.items).toContain(VALIDATION_ERROR_ARRAY_MESSAGES.CONTAINS);
  });

  it('should pass the IsUniqueRule when array has all unique values', () => {
    const schema = scylla.object({
      items: scylla.array().unique(),
    });

    const data = { items: [1, 2, 3] };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsUniqueRule when array has duplicate values', () => {
    const schema = scylla.object({
      items: scylla.array().unique(),
    });

    const data = { items: [1, 2, 2] };
    const errors = scylla.validate(schema, data);

    expect(errors.items).toContain(VALIDATION_ERROR_ARRAY_MESSAGES.IS_UNIQUE);
  });

  it('should pass the HasDuplicatesRule when array has duplicate values', () => {
    const schema = scylla.object({
      items: scylla.array().hasDuplicates(),
    });

    const data = { items: [1, 2, 2] };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the HasDuplicatesRule when array does not have duplicate values', () => {
    const schema = scylla.object({
      items: scylla.array().hasDuplicates(),
    });

    const data = { items: [1, 2, 3] };
    const errors = scylla.validate(schema, data);

    expect(errors.items).toContain(
      VALIDATION_ERROR_ARRAY_MESSAGES.HAS_DUPLICATES,
    );
  });

  it('should pass the ItemsOfTypeRule when all items in the array are of the specified type', () => {
    const schema = scylla.object({
      items: scylla.array().itemsType('number'),
    });

    const data = { items: [1, 2, 3] };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the ItemsOfTypeRule when some items in the array are not of the specified type', () => {
    const schema = scylla.object({
      items: scylla.array().itemsType('number'),
    });

    const data = { items: [1, '2', 3] };
    const errors = scylla.validate(schema, data);

    expect(errors.items).toContain(
      VALIDATION_ERROR_ARRAY_MESSAGES.ITEMS_OF_TYPE('number'),
    );
  });
});
