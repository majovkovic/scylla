export const VALIDATION_ERROR_SHARED_MESSAGES = {
  EQUALS: (expectedValue: any) =>
    `The value does not match the ${expectedValue}.`,
  IS_EMPTY: 'The value should be empty.',
  IS_NOT_EMPTY: 'The value should not be empty.',
  IS_REQUIRED: 'This field is required.',
  IS_MATCH: (compareToField: any) =>
    `The value must match the ${compareToField}.`,
  IS_NONE_OF: (invalidValues: any[]) =>
    `The value must not be any of ${invalidValues.join(', ')}.`,
  IS_NOT: 'The value must not be equal to the specified value.',
  IS_ONE_OF: (validValues: any[]) => `The value must be one of ${validValues}.`,
  CUSTOM: 'Custom Message',
};
