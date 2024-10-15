import { AddSchemaErrors, ValidationErrors, ValidationResult } from '~/types';

export const addSchemaErrors: AddSchemaErrors = (
  field: string,
  validation: ValidationResult,
  errors: ValidationErrors,
) => {
  if (!validation.valid && validation.errors) {
    errors.set(field, (errors.get(field) || []).concat(validation.errors));
  }
};
