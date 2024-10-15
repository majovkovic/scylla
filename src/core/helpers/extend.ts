import { ExtendSchema, SchemaFields } from '~/types';
import { ObjectSchema } from '~/core';

export const extend: ExtendSchema<SchemaFields> = (
  baseSchema: SchemaFields,
  newFields: SchemaFields,
): ObjectSchema => {
  const extendedSchemaFields = new Map(baseSchema);
  newFields.forEach((value, key) => {
    extendedSchemaFields.set(key, value);
  });

  return new ObjectSchema(extendedSchemaFields);
};
