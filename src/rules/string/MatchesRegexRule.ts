import { Rule } from '~/rules';
import { VALIDATION_ERROR_STRING_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class MatchesRegexRule extends Rule<string> {
  private readonly regex: RegExp;

  constructor(regex: RegExp, message?: string) {
    super(message || VALIDATION_ERROR_STRING_MESSAGES.MATCHES_REGEX);
    this.regex = regex;
  }

  validate(value: string): ValidationResult {
    const valid = this.regex.test(value);
    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
