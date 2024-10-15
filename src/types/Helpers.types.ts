import { Rule } from '~/rules';
import { ObjectSchema } from '~/core';

export type SchemaFields = Map<
  string,
  { name: string; type: string; rules: Rule<any>[] }
>;

export type PickSchema<T> = (
  schema: SchemaFields,
  fields: string[],
) => ObjectSchema;

export type OmitSchema<T> = (
  schema: SchemaFields,
  fields: string[],
) => ObjectSchema;

export type PartialSchema<T> = (schema: SchemaFields) => ObjectSchema;

export type ExtendSchema<T> = (
  baseSchema: SchemaFields,
  newFields: SchemaFields,
) => ObjectSchema;

export type MergeSchemas<T> = (
  schemaA: SchemaFields,
  schemaB: SchemaFields,
) => ObjectSchema;
