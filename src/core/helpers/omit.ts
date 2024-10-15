import { OmitSchema, SchemaFields } from '~/types';
import { SchemaFieldBuilder } from '~/fields';

export const omit: OmitSchema<SchemaFields> = (
  schema: SchemaFields,
  fields: string[],
) => {
  const newSchema = new Map(schema);
  fields.forEach((field) => {
    newSchema.delete(field);
  });

  return new SchemaFieldBuilder(newSchema);
};
