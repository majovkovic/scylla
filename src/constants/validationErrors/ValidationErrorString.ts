export const VALIDATION_ERROR_STRING_MESSAGES = {
  IS_STRING: 'The value must be a string.',
  IS_ALPHA: 'The string must contain only alphabetic characters.',
  IS_ALPHA_NUMERIC: 'The string must contain only alphanumeric characters.',
  NOT_A_STRING: 'The value must be a valid string.',
  IS_DATE: 'The value must be a valid date.',
  IS_EMAIL: 'The value must be a valid email address.',
  IS_HEX_COLOR: 'The value must be a valid hex color.',
  IS_IP: 'The value must be a valid IP address.',
  IS_JSON: 'The value must be a valid JSON string.',
  IS_LOWERCASE: 'The string must be in lowercase.',
  IS_UPPERCASE: 'The string must be in uppercase.',
  IS_URL: 'The value must be a valid URL.',
  IS_UUID: 'The value must be a valid UUID.',
  MATCHES_REGEX: 'The string does not match the required pattern.',
  IS_CUID: 'The string must be a valid CUID.',
  IS_CUID2: 'The string must be a valid CUID2.',
  IS_NANOID: 'The string must be a valid Nanoid.',
  IS_ULID: 'The string must be a valid ULID.',
  MAX_LENGTH: (max: number) =>
    `The string must have at most ${max} characters.`,
  MIN_LENGTH: (min: number) =>
    `The string must have at least ${min} characters.`,
  CONTAINS: (substring: string) => `The string must contain "${substring}".`,
  ENDS_WITH: (end: string) => `The string must end with "${end}".`,
  STARTS_WITH: (start: string) => `The string must start with "${start}".`,
  EXACT_LENGTH: (length: number) =>
    `The string must be exactly ${length} characters long.`,
};
