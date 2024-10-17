import {
  ArrayFieldBuilder,
  BooleanFieldBuilder,
  DateFieldBuilder,
  FileFieldBuilder,
  NumberFieldBuilder,
  RecordFieldBuilder,
  SchemaFieldBuilder,
  StringFieldBuilder,
  TupleFieldBuilder,
} from '~/fields';
import { ObjectSchema } from '~/core';

export type Scylla = {
  array: (options?: { message?: string; name?: string }) => ArrayFieldBuilder;
  string: (options?: { message?: string; name?: string }) => StringFieldBuilder;
  boolean: (options?: {
    message?: string;
    name?: string;
  }) => BooleanFieldBuilder;
  date: (options?: { message?: string; name?: string }) => DateFieldBuilder;
  file: (options?: { message?: string; name?: string }) => FileFieldBuilder;
  number: (options?: { message?: string; name?: string }) => NumberFieldBuilder;
  record: (options?: { message?: string; name?: string }) => RecordFieldBuilder;
  tuple: (
    length: number,
    options?: { message?: string; name?: string },
  ) => TupleFieldBuilder;
  object: (fields: Record<string, any>) => SchemaFieldBuilder;
  helpers: {
    pick: (schema: ObjectSchema, fields: string[]) => ObjectSchema;
    omit: (schema: ObjectSchema, fields: string[]) => ObjectSchema;
    partial: (schema: ObjectSchema) => ObjectSchema;
    extend: (
      baseSchema: ObjectSchema,
      newFields: Record<string, any>,
    ) => ObjectSchema;
    merge: (schemaA: ObjectSchema, schemaB: ObjectSchema) => ObjectSchema;
  };
  validate: (
    schema: ObjectSchema,
    data: Record<string, any>,
  ) => { [k: string]: any };
};
