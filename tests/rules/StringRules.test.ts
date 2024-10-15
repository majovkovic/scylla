import { describe, it, expect } from 'vitest';
import { scylla } from '~/index';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';

describe('StringField - Validation Rules', () => {
  it('should pass the IsStringRule when the value is a string', () => {
    const schema = scylla.object({
      name: scylla.string(),
    });

    const data = { name: 'Hello' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsStringRule when the value is not a string', () => {
    const schema = scylla.object({
      name: scylla.string(),
    });

    const data = { name: 123 };
    const errors = scylla.validate(schema, data);

    expect(errors.name).toContain(VALIDATION_ERROR_STRING_MESSAGES.IS_STRING);
  });

  it('should pass the MinLengthRule when string has the minimum required length', () => {
    const schema = scylla.object({
      name: scylla.string().min(3),
    });

    const data = { name: 'Hello' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the MinLengthRule when string is shorter than the minimum length', () => {
    const schema = scylla.object({
      name: scylla.string().min(5),
    });

    const data = { name: 'Hi' };
    const errors = scylla.validate(schema, data);

    expect(errors.name).toContain(
      VALIDATION_ERROR_STRING_MESSAGES.MIN_LENGTH(5),
    );
  });

  it('should pass the MaxLengthRule when string is shorter than or equal to the maximum length', () => {
    const schema = scylla.object({
      name: scylla.string().max(10),
    });

    const data = { name: 'Short' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the MaxLengthRule when string exceeds the maximum length', () => {
    const schema = scylla.object({
      name: scylla.string().max(5),
    });

    const data = { name: 'TooLongString' };
    const errors = scylla.validate(schema, data);

    expect(errors.name).toContain(
      VALIDATION_ERROR_STRING_MESSAGES.MAX_LENGTH(5),
    );
  });

  it('should pass the IsAlphaRule when string contains only alphabetic characters', () => {
    const schema = scylla.object({
      name: scylla.string().alpha(),
    });

    const data = { name: 'Hello' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsAlphaRule when string contains non-alphabetic characters', () => {
    const schema = scylla.object({
      name: scylla.string().alpha(),
    });

    const data = { name: 'Hello123' };
    const errors = scylla.validate(schema, data);

    expect(errors.name).toContain(VALIDATION_ERROR_STRING_MESSAGES.IS_ALPHA);
  });

  it('should pass the IsEmailRule when the string is a valid email address', () => {
    const schema = scylla.object({
      email: scylla.string().email(),
    });

    const data = { email: 'test@example.com' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsEmailRule when the string is not a valid email address', () => {
    const schema = scylla.object({
      email: scylla.string().email(),
    });

    const data = { email: 'invalid-email' };
    const errors = scylla.validate(schema, data);

    expect(errors.email).toContain(VALIDATION_ERROR_STRING_MESSAGES.IS_EMAIL);
  });

  it('should pass the IsHexColorRule when string is a valid hex color', () => {
    const schema = scylla.object({
      color: scylla.string().hex(),
    });

    const data = { color: '#FF5733' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsHexColorRule when string is not a valid hex color', () => {
    const schema = scylla.object({
      color: scylla.string().hex(),
    });

    const data = { color: 'not-a-hex' };
    const errors = scylla.validate(schema, data);

    expect(errors.color).toContain(
      VALIDATION_ERROR_STRING_MESSAGES.IS_HEX_COLOR,
    );
  });

  it('should pass the ContainsRule when the string contains the specified substring', () => {
    const schema = scylla.object({
      text: scylla.string().contains('world'),
    });

    const data = { text: 'Hello world' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the ContainsRule when the string does not contain the specified substring', () => {
    const schema = scylla.object({
      text: scylla.string().contains('missing'),
    });

    const data = { text: 'Hello world' };
    const errors = scylla.validate(schema, data);

    expect(errors.text).toContain(
      VALIDATION_ERROR_STRING_MESSAGES.CONTAINS('missing'),
    );
  });

  it('should pass the StartsWithRule when the string starts with the specified substring', () => {
    const schema = scylla.object({
      text: scylla.string().startsWith('Hello'),
    });

    const data = { text: 'Hello world' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the StartsWithRule when the string does not start with the specified substring', () => {
    const schema = scylla.object({
      text: scylla.string().startsWith('World'),
    });

    const data = { text: 'Hello world' };
    const errors = scylla.validate(schema, data);

    expect(errors.text).toContain(
      VALIDATION_ERROR_STRING_MESSAGES.STARTS_WITH('World'),
    );
  });

  it('should pass the EndsWithRule when the string ends with the specified substring', () => {
    const schema = scylla.object({
      text: scylla.string().endsWith('world'),
    });

    const data = { text: 'Hello world' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the EndsWithRule when the string does not end with the specified substring', () => {
    const schema = scylla.object({
      text: scylla.string().endsWith('Hello'),
    });

    const data = { text: 'Hello world' };
    const errors = scylla.validate(schema, data);

    expect(errors.text).toContain(
      VALIDATION_ERROR_STRING_MESSAGES.ENDS_WITH('Hello'),
    );
  });

  it('should pass the MatchesRegexRule when the string matches the provided regex', () => {
    const schema = scylla.object({
      text: scylla.string().regex(/^[A-Z]+$/),
    });

    const data = { text: 'HELLO' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the MatchesRegexRule when the string does not match the provided regex', () => {
    const schema = scylla.object({
      text: scylla.string().regex(/^[A-Z]+$/),
    });

    const data = { text: 'Hello123' };
    const errors = scylla.validate(schema, data);

    expect(errors.text).toContain(
      VALIDATION_ERROR_STRING_MESSAGES.MATCHES_REGEX,
    );
  });

  it('should pass the ExactLengthRule when the string has the exact specified length', () => {
    const schema = scylla.object({
      text: scylla.string().exactLength(5),
    });

    const data = { text: 'Hello' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the ExactLengthRule when the string does not have the exact specified length', () => {
    const schema = scylla.object({
      text: scylla.string().exactLength(5),
    });

    const data = { text: 'HelloWorld' };
    const errors = scylla.validate(schema, data);

    expect(errors.text).toContain(
      VALIDATION_ERROR_STRING_MESSAGES.EXACT_LENGTH(5),
    );
  });

  it('should pass the IsAlphaNumericRule when the string contains only alphanumeric characters', () => {
    const schema = scylla.object({
      text: scylla.string().alphaNumeric(),
    });

    const data = { text: 'Hello123' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsAlphaNumericRule when the string contains non-alphanumeric characters', () => {
    const schema = scylla.object({
      text: scylla.string().alphaNumeric(),
    });

    const data = { text: 'Hello@123' };
    const errors = scylla.validate(schema, data);

    expect(errors.text).toContain(
      VALIDATION_ERROR_STRING_MESSAGES.IS_ALPHA_NUMERIC,
    );
  });

  it('should pass the IsUUIDRule when the string is a valid UUID', () => {
    const schema = scylla.object({
      id: scylla.string().uuid(),
    });

    const data = { id: '123e4567-e89b-12d3-a456-426614174000' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsUUIDRule when the string is not a valid UUID', () => {
    const schema = scylla.object({
      id: scylla.string().uuid(),
    });

    const data = { id: 'invalid-uuid' };
    const errors = scylla.validate(schema, data);

    expect(errors.id).toContain(VALIDATION_ERROR_STRING_MESSAGES.IS_UUID);
  });

  it('should pass the IsLowercaseRule when the string is lowercase', () => {
    const schema = scylla.object({
      text: scylla.string().lowerCase(),
    });

    const data = { text: 'hello' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsLowercaseRule when the string is not lowercase', () => {
    const schema = scylla.object({
      text: scylla.string().lowerCase(),
    });

    const data = { text: 'Hello' };
    const errors = scylla.validate(schema, data);

    expect(errors.text).toContain(
      VALIDATION_ERROR_STRING_MESSAGES.IS_LOWERCASE,
    );
  });

  it('should pass the IsUppercaseRule when the string is uppercase', () => {
    const schema = scylla.object({
      text: scylla.string().upperCase(),
    });

    const data = { text: 'HELLO' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsUppercaseRule when the string is not uppercase', () => {
    const schema = scylla.object({
      text: scylla.string().upperCase(),
    });

    const data = { text: 'Hello' };
    const errors = scylla.validate(schema, data);

    expect(errors.text).toContain(
      VALIDATION_ERROR_STRING_MESSAGES.IS_UPPERCASE,
    );
  });

  it('should pass the IsURLRule when the string is a valid URL', () => {
    const schema = scylla.object({
      url: scylla.string().url(),
    });

    const data = { url: 'https://www.example.com' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsURLRule when the string is not a valid URL', () => {
    const schema = scylla.object({
      url: scylla.string().url(),
    });

    const data = { url: 'invalid-url' };
    const errors = scylla.validate(schema, data);

    expect(errors.url).toContain(VALIDATION_ERROR_STRING_MESSAGES.IS_URL);
  });

  it('should pass the IsIPRule when the string is a valid IP address', () => {
    const schema = scylla.object({
      ip: scylla.string().ip(),
    });

    const data = { ip: '192.168.1.1' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsIPRule when the string is not a valid IP address', () => {
    const schema = scylla.object({
      ip: scylla.string().ip(),
    });

    const data = { ip: 'invalid-ip' };
    const errors = scylla.validate(schema, data);

    expect(errors.ip).toContain(VALIDATION_ERROR_STRING_MESSAGES.IS_IP);
  });

  it('should pass the IsJSONRule when the string is valid JSON', () => {
    const schema = scylla.object({
      json: scylla.string().json(),
    });

    const data = { json: '{"name":"John", "age":30}' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsJSONRule when the string is not valid JSON', () => {
    const schema = scylla.object({
      json: scylla.string().json(),
    });

    const data = { json: 'invalid-json' };
    const errors = scylla.validate(schema, data);

    expect(errors.json).toContain(VALIDATION_ERROR_STRING_MESSAGES.IS_JSON);
  });

  it('should pass the IsNanoidRule when the string is a valid NanoID', () => {
    const schema = scylla.object({
      id: scylla.string().nanoid(),
    });

    const data = { id: '1234567890abcdefgHIJK' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsNanoidRule when the string is not a valid NanoID', () => {
    const schema = scylla.object({
      id: scylla.string().nanoid(),
    });

    const data = { id: 'invalid-nanoid' };
    const errors = scylla.validate(schema, data);

    expect(errors.id).toContain(VALIDATION_ERROR_STRING_MESSAGES.IS_NANOID);
  });

  it('should pass the IsCUIDRule when the string is a valid CUID', () => {
    const schema = scylla.object({
      id: scylla.string().cuid(),
    });

    const data = { id: 'cknv6hqxg000101l82v78eal5' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsCUIDRule when the string is not a valid CUID', () => {
    const schema = scylla.object({
      id: scylla.string().cuid(),
    });

    const data = { id: 'invalid-cuid' };
    const errors = scylla.validate(schema, data);

    expect(errors.id).toContain(VALIDATION_ERROR_STRING_MESSAGES.IS_CUID);
  });

  it('should pass the IsCUID2Rule when the string is a valid CUID2', () => {
    const schema = scylla.object({
      id: scylla.string().cuid2(),
    });

    const data = { id: 'cjld2cjxh0000qzrmn831i7rn' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsCUID2Rule when the string is not a valid CUID2', () => {
    const schema = scylla.object({
      id: scylla.string().cuid2(),
    });

    const data = { id: 'invalid-cuid2' };
    const errors = scylla.validate(schema, data);

    expect(errors.id).toContain(VALIDATION_ERROR_STRING_MESSAGES.IS_CUID2);
  });

  it('should pass the IsULIDRule when the string is a valid ULID', () => {
    const schema = scylla.object({
      id: scylla.string().ulid(),
    });

    const data = { id: '01ARZ3NDEKTSV4RRFFQ69G5FAV' };
    const errors = scylla.validate(schema, data);

    expect(errors).toEqual({});
  });

  it('should fail the IsULIDRule when the string is not a valid ULID', () => {
    const schema = scylla.object({
      id: scylla.string().ulid(),
    });

    const data = { id: 'invalid-ulid' };
    const errors = scylla.validate(schema, data);

    expect(errors.id).toContain(VALIDATION_ERROR_STRING_MESSAGES.IS_ULID);
  });
});
