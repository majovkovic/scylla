import { PickSchema, SchemaFields } from '~/types';
import { SchemaFieldBuilder } from '~/fields';

export const pick: PickSchema<SchemaFields> = (
  schema: SchemaFields,
  fields: string[],
) => {
  const newSchema = new Map<string, any>();

  fields.forEach((field) => {
    if (schema.has(field)) {
      newSchema.set(field, schema.get(field));
    }
  });

  return new SchemaFieldBuilder(newSchema);
};
