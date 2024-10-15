import { MergeSchemas, SchemaFields } from '~/types';
import { SchemaFieldBuilder } from '~/fields';

export const merge: MergeSchemas<SchemaFields> = (
  schemaA: SchemaFields,
  schemaB: SchemaFields,
) => {
  const newSchema = new Map(schemaA);
  schemaB.forEach((value, key) => {
    newSchema.set(key, value);
  });

  return new SchemaFieldBuilder(newSchema);
};
