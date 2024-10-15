export const VALIDATION_ERROR_RECORD_MESSAGES = {
  HAS_KEY: (key: string) => `The record must have the key "${key}".`,
  HAS_KEYS: (keys: string[]) =>
    `The record must contain the following keys: ${keys.join(', ')}.`,
  IS_RECORD: 'Value must be a valid record (object).',
  MAX_KEYS: (max: number) => `The record must have at most ${max} keys.`,
  MIN_KEYS: (min: number) => `The record must have at least ${min} keys.`,
};
