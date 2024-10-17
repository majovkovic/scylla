import { ObjectSchema } from '~/core';
import {
  ArrayFieldBuilder,
  StringFieldBuilder,
  BooleanFieldBuilder,
  DateFieldBuilder,
  NumberFieldBuilder,
  RecordFieldBuilder,
  TupleFieldBuilder,
  SchemaFieldBuilder,
  FileFieldBuilder,
} from '~/fields';
import { pick, omit, partial, extend, merge } from '~/core';
import { Scylla } from '~/types';

export const scylla: Scylla = {
  /**
   * Creates a new ArrayFieldBuilder for defining array-based validation rules.
   * @param options - An object containing optional `message` and `name` for the array field.
   */
  array: (options: { message?: string; name?: string } = {}) =>
    new ArrayFieldBuilder(options),

  /**
   * Creates a new StringFieldBuilder for defining string-based validation rules.
   * @param options - An object containing optional `message` and `name` for the array field.
   */
  string: (options: { message?: string; name?: string } = {}) =>
    new StringFieldBuilder(options),

  /**
   * Creates a new BooleanFieldBuilder for defining boolean-based validation rules.
   * @param options - An object containing optional `message` and `name` for the array field.
   */
  boolean: (options: { message?: string; name?: string } = {}) =>
    new BooleanFieldBuilder(options),

  /**
   * Creates a new DateFieldBuilder for defining date-based validation rules.
   * @param options - An object containing optional `message` and `name` for the array field.
   */
  date: (options: { message?: string; name?: string } = {}) =>
    new DateFieldBuilder(options),

  /**
   * Creates a new FileFieldBuilder for defining file-based validation rules.
   * @param options - An object containing optional `message` and `name` for the array field.
   */
  file: (options: { message?: string; name?: string } = {}) =>
    new FileFieldBuilder(options),

  /**
   * Creates a new NumberFieldBuilder for defining number-based validation rules.
   * @param options - An object containing optional `message` and `name` for the array field.
   */
  number: (options: { message?: string; name?: string } = {}) =>
    new NumberFieldBuilder(options),

  /**
   * Creates a new RecordFieldBuilder for defining record-based validation rules.
   * @param options - An object containing optional `message` and `name` for the array field.
   */
  record: (options: { message?: string; name?: string } = {}) =>
    new RecordFieldBuilder(options),

  /**
   * Creates a new TupleFieldBuilder for defining tuple-based validation rules.
   * @param length - The expected length of the tuple.
   * @param options - An object containing optional `message` and `name` for the array field.
   */
  tuple: (length: number, options: { message?: string; name?: string } = {}) =>
    new TupleFieldBuilder(length, options),

  /**
   * Creates a new SchemaFieldBuilder for defining object-based validation rules.
   * @param fields - A record of field names and their corresponding field builders.
   */
  object: (fields: Record<string, any>) => {
    const fieldMap = new Map(
      Object.entries(fields).map(([key, field]) => [key, field]),
    );
    return new SchemaFieldBuilder(fieldMap);
  },

  helpers: {
    /**
     * Picks specified fields from the given schema.
     * @param schema - The schema to pick fields from.
     * @param fields - Array of field names to pick.
     * @returns A new schema with only the picked fields.
     */
    pick: (schema: ObjectSchema, fields: string[]) => {
      return pick(schema.fields, fields);
    },

    /**
     * Omits specified fields from the given schema.
     * @param schema - The schema to omit fields from.
     * @param fields - Array of field names to omit.
     * @returns A new schema with the specified fields omitted.
     */
    omit: (schema: ObjectSchema, fields: string[]) => {
      return omit(schema.fields, fields);
    },

    /**
     * Makes all fields optional in the given schema.
     * @param schema - The schema to make partial (optional fields).
     * @returns A new schema where all fields are optional.
     */
    partial: (schema: ObjectSchema) => {
      return partial(schema.fields);
    },

    /**
     * Extends the base schema with additional fields.
     * @param baseSchema - The schema to extend.
     * @param newFields - A record of field names and field builders to add.
     * @returns A new schema with the extended fields.
     */
    extend: (baseSchema: ObjectSchema, newFields: Record<string, any>) => {
      const newFieldsMap = new Map(
        Object.entries(newFields).map(([key, field]) => [key, field]),
      );
      return extend(baseSchema.fields, newFieldsMap);
    },

    /**
     * Merges two schemas into one.
     * @param schemaA - The first schema.
     * @param schemaB - The second schema.
     * @returns A new schema containing the fields from both schemas.
     */
    merge: (schemaA: ObjectSchema, schemaB: ObjectSchema) => {
      return merge(schemaA.fields, schemaB.fields);
    },
  },

  /**
   * Validates data against the given schema.
   * @param schema - The schema to validate against.
   * @param data - The data to validate.
   * @returns An object of validation errors, if any.
   */
  validate: (schema: ObjectSchema, data: Record<string, any>) => {
    const dataMap = new Map(Object.entries(data));

    const result = schema.validate(dataMap).getValue();
    return Object.fromEntries(result.entries());
  },
};
