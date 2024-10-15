import { describe, it, expect } from 'vitest';
import { scylla } from '../../src';
import { VALIDATION_ERROR_RECORD_MESSAGES } from '../../src/constants/validationErrors';

describe('RecordField - Validation Rules', () => {
  it('should pass the IsRecordRule when the value is a record', () => {
    const schema = scylla.object({
      info: scylla.record(),
    });

    const data = { info: { key1: 'value1', key2: 'value2' } };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsRecordRule when the value is not a record', () => {
    const schema = scylla.object({
      info: scylla.record(),
    });

    const data = { info: 'not a record' };
    const errors = scylla.validate(schema, data);

    expect(errors.info).toContain(VALIDATION_ERROR_RECORD_MESSAGES.IS_RECORD);
  });

  it('should pass the HasKeyRule when the record contains the specified key', () => {
    const schema = scylla.object({
      info: scylla.record().hasKey('key1'),
    });

    const data = { info: { key1: 'value1', key2: 'value2' } };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the HasKeyRule when the record does not contain the specified key', () => {
    const schema = scylla.object({
      info: scylla.record().hasKey('key3'),
    });

    const data = { info: { key1: 'value1', key2: 'value2' } };
    const errors = scylla.validate(schema, data);

    expect(errors.info).toContain(
      VALIDATION_ERROR_RECORD_MESSAGES.HAS_KEY('key3'),
    );
  });

  it('should pass the MinKeysRule when the record has at least the minimum number of keys', () => {
    const schema = scylla.object({
      info: scylla.record().minKeys(2),
    });

    const data = { info: { key1: 'value1', key2: 'value2' } };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the MinKeysRule when the record has fewer than the minimum number of keys', () => {
    const schema = scylla.object({
      info: scylla.record().minKeys(3),
    });

    const data = { info: { key1: 'value1', key2: 'value2' } };
    const errors = scylla.validate(schema, data);

    expect(errors.info).toContain(VALIDATION_ERROR_RECORD_MESSAGES.MIN_KEYS(3));
  });

  it('should pass the MaxKeysRule when the record has at most the maximum number of keys', () => {
    const schema = scylla.object({
      info: scylla.record().maxKeys(2),
    });

    const data = { info: { key1: 'value1', key2: 'value2' } };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the MaxKeysRule when the record has more than the maximum number of keys', () => {
    const schema = scylla.object({
      info: scylla.record().maxKeys(1),
    });

    const data = { info: { key1: 'value1', key2: 'value2' } };
    const errors = scylla.validate(schema, data);

    expect(errors.info).toContain(VALIDATION_ERROR_RECORD_MESSAGES.MAX_KEYS(1));
  });

  it('should pass the HasKeysRule when the record contains all specified keys', () => {
    const schema = scylla.object({
      info: scylla.record().hasKeys(['key1', 'key2']),
    });

    const data = { info: { key1: 'value1', key2: 'value2' } };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the HasKeysRule when the record does not contain all specified keys', () => {
    const schema = scylla.object({
      info: scylla.record().hasKeys(['key1', 'key3']),
    });

    const data = { info: { key1: 'value1', key2: 'value2' } };
    const errors = scylla.validate(schema, data);

    expect(errors.info).toContain(
      VALIDATION_ERROR_RECORD_MESSAGES.HAS_KEYS(['key1', 'key3']),
    );
  });
});
