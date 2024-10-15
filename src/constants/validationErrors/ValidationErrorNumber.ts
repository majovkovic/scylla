export const VALIDATION_ERROR_NUMBER_MESSAGES = {
  NOT_A_NUMBER: 'The value must be a valid number.',
  IS_BETWEEN: (min: number, max: number) =>
    `The number must be between ${min} and ${max}.`,
  IS_EVEN: 'The number must be even.',
  IS_FLOAT: 'The number must be a float.',
  IS_INTEGER: 'The number must be an integer.',
  IS_MULTIPLE_OF: (divisor: number) =>
    `The number must be a multiple of ${divisor}.`,
  IS_NEGATIVE: 'The number must be negative.',
  IS_ODD: 'The number must be odd.',
  IS_POSITIVE: 'The number must be positive.',
  MAX: (max: number) => `The number must be less than or equal to ${max}.`,
  MIN: (min: number) => `The number must be greater than or equal to ${min}.`,
};
