import { describe, it, expect } from 'vitest';
import { scylla } from '~/index';
import { VALIDATION_ERROR_SHARED_MESSAGES } from '~/constants/validationErrors';

describe('SharedRules - Validation', () => {
  it('should pass the EqualsRule when the value equals the expected value', () => {
    const schema = scylla.object({
      field: scylla.string().equals('expected'),
    });

    const data = { field: 'expected' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the EqualsRule when the value does not equal the expected value', () => {
    const schema = scylla.object({
      field: scylla.string().equals('expected'),
    });

    const data = { field: 'different' };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(
      VALIDATION_ERROR_SHARED_MESSAGES.EQUALS('expected'),
    );
  });

  it('should pass the IsEmptyRule when the value is empty', () => {
    const schema = scylla.object({
      field: scylla.string().empty(),
    });

    const data = { field: '' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsEmptyRule when the value is not empty', () => {
    const schema = scylla.object({
      field: scylla.string().empty(),
    });

    const data = { field: 'not empty' };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(VALIDATION_ERROR_SHARED_MESSAGES.IS_EMPTY);
  });

  it('should pass the IsNotEmptyRule when the value is not empty', () => {
    const schema = scylla.object({
      field: scylla.string().notEmpty(),
    });

    const data = { field: 'some value' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsNotEmptyRule when the value is empty', () => {
    const schema = scylla.object({
      field: scylla.string().notEmpty(),
    });

    const data = { field: '' };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(
      VALIDATION_ERROR_SHARED_MESSAGES.IS_NOT_EMPTY,
    );
  });

  it('should pass the IsRequiredRule when the value is present', () => {
    const schema = scylla.object({
      field: scylla.string().required(),
    });

    const data = { field: 'value' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsRequiredRule when the value is missing', () => {
    const schema = scylla.object({
      field: scylla.string().required(),
    });

    const data = { field: '' };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(
      VALIDATION_ERROR_SHARED_MESSAGES.IS_REQUIRED,
    );
  });

  it('should pass the IsOneOfRule when the value is one of the valid options', () => {
    const schema = scylla.object({
      field: scylla.string().oneOf(['option1', 'option2']),
    });

    const data = { field: 'option1' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsOneOfRule when the value is not one of the valid options', () => {
    const schema = scylla.object({
      field: scylla.string().oneOf(['option1', 'option2']),
    });

    const data = { field: 'invalid' };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(
      VALIDATION_ERROR_SHARED_MESSAGES.IS_ONE_OF(['option1', 'option2']),
    );
  });

  it('should pass the IsNoneOfRule when the value is not any of the invalid options', () => {
    const schema = scylla.object({
      field: scylla.string().noneOf(['option1', 'option2']),
    });

    const data = { field: 'valid' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsNoneOfRule when the value is one of the invalid options', () => {
    const schema = scylla.object({
      field: scylla.string().noneOf(['option1', 'option2']),
    });

    const data = { field: 'option1' };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(
      VALIDATION_ERROR_SHARED_MESSAGES.IS_NONE_OF(['option1', 'option2']),
    );
  });

  it('should pass the IsOptionalRule when the field is missing', () => {
    const schema = scylla.object({
      field: scylla.string().optional(),
    });

    const data = {};
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should pass the IsMatchRule when the value matches the compare field', () => {
    const schema = scylla.object({
      password: scylla.string(),
      confirmPassword: scylla.string().match('password'),
    });

    const data = { password: 'secret', confirmPassword: 'secret' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsMatchRule when the value does not match the compare field', () => {
    const schema = scylla.object({
      password: scylla.string(),
      confirmPassword: scylla.string().match('password'),
    });

    const data = { password: 'secret', confirmPassword: 'different' };
    const errors = scylla.validate(schema, data);

    expect(errors.confirmPassword).toContain(
      VALIDATION_ERROR_SHARED_MESSAGES.IS_MATCH('password'),
    );
  });

  it('should pass the CustomValidationRule when the custom validationErrors function returns true', () => {
    const schema = scylla.object({
      field: scylla.string().custom((value) => value.length > 5),
    });

    const data = { field: 'validValue' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the CustomValidationRule when the custom validationErrors function returns false', () => {
    const schema = scylla.object({
      field: scylla
        .string()
        .custom((value) => value.length > 5, 'Length must be greater than 5'),
    });

    const data = { field: 'short' };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain('Length must be greater than 5');
  });
});
