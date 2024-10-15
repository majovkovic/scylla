export const VALIDATION_ERROR_DATE_MESSAGES = {
  IS_DATE: 'The value must be a valid date.',
  IS_AFTER: (afterDate: string) => `The date must be after ${afterDate}.`,
  IS_BEFORE: (beforeDate: string) => `The date must be before ${beforeDate}.`,
  IS_BETWEEN: (startDate: string, beforeDate: string) =>
    `The date must be between ${startDate} and ${beforeDate}.`,
  IS_EXACT: (exactDate: string) => `The date must be exactly ${exactDate}.`,
  IS_FUTURE: 'The date must be in the future.',
  IS_PAST: 'The date must be in the past.',
  IS_TODAY: 'The date must be today.',
  NOT_A_DATE: 'The value must be a valid date.',
};
