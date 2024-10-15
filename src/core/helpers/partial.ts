import { PartialSchema, SchemaFields } from '~/types';
import { IsOptionalRule } from '~/rules/shared';
import { SchemaFieldBuilder } from '~/fields';

export const partial: PartialSchema<SchemaFields> = (schema: SchemaFields) => {
  const newSchema = new Map<string, any>();
  schema.forEach((field, key) => {
    const updatedField = {
      ...field,
      rules: [...field.rules, new IsOptionalRule()],
    };
    newSchema.set(key, updatedField);
  });

  return new SchemaFieldBuilder(newSchema);
};
