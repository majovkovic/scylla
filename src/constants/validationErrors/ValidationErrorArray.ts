export const VALIDATION_ERROR_ARRAY_MESSAGES = {
  NOT_AN_ARRAY: 'Value must be an array.',
  CONTAINS: 'The array must contain the specified value.',
  CONTAINS_ALL: 'The array must contain all specified values.',
  HAS_DUPLICATES: 'The array contains duplicate values.',
  IS_UNIQUE: 'The array must have unique values.',
  ITEMS_OF_TYPE: (type: string) => `All items must be of type ${type}.`,
  MAX_ITEMS: (max: number) => `The array must have at most ${max} items.`,
  MIN_ITEMS: (min: number) => `The array must have at least ${min} items.`,
};
