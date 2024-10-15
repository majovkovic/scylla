import { describe, it, expect, beforeEach } from 'vitest';
import { scylla } from '~/index';
import { ObjectSchema } from '~/core';

describe('Scylla Helpers', () => {
  let schema: ObjectSchema;

  beforeEach(() => {
    schema = scylla.object({
      name: scylla.string(),
      age: scylla.number(),
      email: scylla.string(),
      isAdmin: scylla.boolean(),
    });
  });

  it('should pick specified fields from helpers', () => {
    const pickedSchema = scylla.helpers.pick(schema, ['name', 'email']);
    expect(pickedSchema.fields.size).toBe(2);
    expect(pickedSchema.fields.has('name')).toBe(true);
    expect(pickedSchema.fields.has('email')).toBe(true);
  });

  it('should omit specified fields from helpers', () => {
    const omittedSchema = scylla.helpers.omit(schema, ['isAdmin']);
    expect(omittedSchema.fields.size).toBe(3);
    expect(omittedSchema.fields.has('isAdmin')).toBe(false);
    expect(omittedSchema.fields.has('name')).toBe(true);
  });

  it('should make all fields optional in helpers using partial', () => {
    const partialSchema = scylla.helpers.partial(schema);
    const errors = scylla.validate(partialSchema, {});
    expect(errors).toEqual({});
  });

  it('should extend the helpers with new fields', () => {
    const newFields = {
      address: scylla.string('Address is required'),
    };

    const extendedSchema = scylla.helpers.extend(schema, newFields);
    expect(extendedSchema.fields.size).toBe(5);
    expect(extendedSchema.fields.has('address')).toBe(true);
  });

  it('should merge two schemas', () => {
    const schemaA = scylla.object({
      name: scylla.string(),
    });

    const schemaB = scylla.object({
      age: scylla.number(),
    });

    const mergedSchema = scylla.helpers.merge(schemaA, schemaB);
    expect(mergedSchema.fields.size).toBe(2);
    expect(mergedSchema.fields.has('name')).toBe(true);
    expect(mergedSchema.fields.has('age')).toBe(true);
  });
});
