import { describe, it, expect } from 'vitest';
import { scylla } from '~/index';
import { VALIDATION_ERROR_DATE_MESSAGES } from '~/constants/validationErrors';

describe('DateField - Validation Rules', () => {
  it('should pass the IsDateRule when the value is a valid date', () => {
    const schema = scylla.object({
      field: scylla.date(),
    });

    const data = { field: '2024-01-01' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsDateRule when the value is not a valid date', () => {
    const schema = scylla.object({
      field: scylla.date(),
    });

    const data = { field: 'invalid date' };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(VALIDATION_ERROR_DATE_MESSAGES.IS_DATE);
  });

  it('should pass the IsBeforeDateRule when the value is before the specified date', () => {
    const schema = scylla.object({
      field: scylla.date().before('2024-01-01'),
    });

    const data = { field: '2023-12-31' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsBeforeDateRule when the value is not before the specified date', () => {
    const schema = scylla.object({
      field: scylla.date().before('2024-01-01'),
    });

    const data = { field: '2024-01-02' };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(
      VALIDATION_ERROR_DATE_MESSAGES.IS_BEFORE('2024-01-01'),
    );
  });

  it('should pass the IsAfterDateRule when the value is after the specified date', () => {
    const schema = scylla.object({
      field: scylla.date().after('2023-12-31'),
    });

    const data = { field: '2024-01-01' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsAfterDateRule when the value is not after the specified date', () => {
    const schema = scylla.object({
      field: scylla.date().after('2024-01-01'),
    });

    const data = { field: '2023-12-31' };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(
      VALIDATION_ERROR_DATE_MESSAGES.IS_AFTER('2024-01-01'),
    );
  });

  it('should pass the IsBetweenDatesRule when the date is within the range', () => {
    const schema = scylla.object({
      field: scylla.date().between('2023-01-01', '2024-12-31'),
    });

    const data = { field: '2024-06-15' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsBetweenDatesRule when the date is outside the range', () => {
    const schema = scylla.object({
      field: scylla.date().between('2023-01-01', '2024-12-31'),
    });

    const data = { field: '2025-01-01' };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(
      VALIDATION_ERROR_DATE_MESSAGES.IS_BETWEEN('2023-01-01', '2024-12-31'),
    );
  });

  it('should pass the IsTodayRule when the date is today', () => {
    const schema = scylla.object({
      field: scylla.date().today(),
    });

    const today = new Date().toISOString().split('T')[0];
    const data = { field: today };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsTodayRule when the date is not today', () => {
    const schema = scylla.object({
      field: scylla.date().today(),
    });

    const data = { field: '2020-01-01' };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(VALIDATION_ERROR_DATE_MESSAGES.IS_TODAY);
  });

  it('should pass the IsFutureDateRule when the date is in the future', () => {
    const schema = scylla.object({
      field: scylla.date().future(),
    });

    const data = { field: '2025-01-01' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsFutureDateRule when the date is not in the future', () => {
    const schema = scylla.object({
      field: scylla.date().future(),
    });

    const data = { field: '2020-01-01' };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(VALIDATION_ERROR_DATE_MESSAGES.IS_FUTURE);
  });

  it('should pass the IsPastDateRule when the date is in the past', () => {
    const schema = scylla.object({
      field: scylla.date().past(),
    });

    const data = { field: '2020-01-01' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsPastDateRule when the date is not in the past', () => {
    const schema = scylla.object({
      field: scylla.date().past(),
    });

    const data = { field: '2025-01-01' };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(VALIDATION_ERROR_DATE_MESSAGES.IS_PAST);
  });

  it('should pass the IsExactDateRule when the date matches the exact date', () => {
    const schema = scylla.object({
      field: scylla.date().exact('2024-01-01'),
    });

    const data = { field: '2024-01-01' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsExactDateRule when the date does not match the exact date', () => {
    const schema = scylla.object({
      field: scylla.date().exact('2024-01-01'),
    });

    const data = { field: '2023-12-31' };
    const errors = scylla.validate(schema, data);

    expect(errors.field).toContain(
      VALIDATION_ERROR_DATE_MESSAGES.IS_EXACT('2024-01-01'),
    );
  });
});
