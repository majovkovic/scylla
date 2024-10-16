import { SharedFieldBuilder } from '~/fields/SharedFieldBuilder';
import {
  IsStringRule,
  MinLengthRule,
  MaxLengthRule,
  IsAlphaRule,
  IsAlphaNumericRule,
  IsEmailRule,
  IsUUIDRule,
  IsLowercaseRule,
  IsUppercaseRule,
  IsURLRule,
  IsNanoidRule,
  IsCUIDRule,
  IsCUID2Rule,
  IsULIDRule,
  StringContainsRule,
  StartsWithRule,
  EndsWithRule,
  IsHexColorRule,
  MatchesRegexRule,
  StringIsDateRule,
  IsIPRule,
  IsJSONRule,
  ExactLengthRule,
} from '~/rules/string';
import { BuilderFieldOptions } from '~/types';

export class StringFieldBuilder extends SharedFieldBuilder<string> {
  constructor({ message, name }: BuilderFieldOptions = {}) {
    super(name || 'defaultStringName', 'string');
    this.addRule(new IsStringRule(message));
  }

  /**
   * Adds a rule that the string must have at least the specified minimum length.
   */
  min(min: number, message?: string) {
    this.addRule(new MinLengthRule(min, message));
    return this;
  }

  /**
   * Adds a rule that the string must not exceed the specified maximum length.
   */
  max(max: number, message?: string) {
    this.addRule(new MaxLengthRule(max, message));
    return this;
  }

  /**
   * Adds a rule that the string must contain the specified substring.
   */
  contains(substring: string, message?: string) {
    this.addRule(new StringContainsRule(substring, message));
    return this;
  }

  /**
   * Adds a rule that the string must start with the specified substring.
   */
  startsWith(substring: string, message?: string) {
    this.addRule(new StartsWithRule(substring, message));
    return this;
  }

  /**
   * Adds a rule that the string must have exactly the specified length.
   */
  exactLength(length: number, message?: string) {
    this.addRule(new ExactLengthRule(length, message));
    return this;
  }

  /**
   * Adds a rule that the string must end with the specified substring.
   */
  endsWith(substring: string, message?: string) {
    this.addRule(new EndsWithRule(substring, message));
    return this;
  }

  /**
   * Adds a rule that the string must contain only alphabetic characters.
   */
  alpha(message?: string) {
    this.addRule(new IsAlphaRule(message));
    return this;
  }

  /**
   * Adds a rule that the string must contain only alphanumeric characters.
   */
  alphaNumeric(message?: string) {
    this.addRule(new IsAlphaNumericRule(message));
    return this;
  }

  /**
   * Adds a rule that the string must be a valid email address.
   */
  email(message?: string) {
    this.addRule(new IsEmailRule(message));
    return this;
  }

  /**
   * Adds a rule that the string must be a valid UUID.
   */
  uuid(message?: string) {
    this.addRule(new IsUUIDRule(message));
    return this;
  }

  /**
   * Adds a rule that the string must be entirely in lowercase.
   */
  lowerCase(message?: string) {
    this.addRule(new IsLowercaseRule(message));
    return this;
  }

  /**
   * Adds a rule that the string must be entirely in uppercase.
   */
  upperCase(message?: string) {
    this.addRule(new IsUppercaseRule(message));
    return this;
  }

  /**
   * Adds a rule that the string must be a valid URL.
   */
  url(message?: string) {
    this.addRule(new IsURLRule(message));
    return this;
  }

  /**
   * Adds a rule that the string must be a valid hexadecimal color.
   */
  hex(message?: string) {
    this.addRule(new IsHexColorRule(message));
    return this;
  }

  /**
   * Adds a rule that the string must match the provided regular expression.
   */
  regex(regex: RegExp, message?: string) {
    this.addRule(new MatchesRegexRule(regex, message));
    return this;
  }

  /**
   * Adds a rule that the string must represent a valid date.
   */
  date(message?: string) {
    this.addRule(new StringIsDateRule(message));
    return this;
  }

  /**
   * Adds a rule that the string must be a valid IP address.
   */
  ip(message?: string) {
    this.addRule(new IsIPRule(message));
    return this;
  }

  /**
   * Adds a rule that the string must be valid JSON.
   */
  json(message?: string) {
    this.addRule(new IsJSONRule(message));
    return this;
  }

  /**
   * Adds a rule that the string must be a valid Nanoid.
   */
  nanoid(message?: string) {
    this.addRule(new IsNanoidRule(message));
    return this;
  }

  /**
   * Adds a rule that the string must be a valid CUID.
   */
  cuid(message?: string) {
    this.addRule(new IsCUIDRule(message));
    return this;
  }

  /**
   * Adds a rule that the string must be a valid CUID2.
   */
  cuid2(message?: string) {
    this.addRule(new IsCUID2Rule(message));
    return this;
  }

  /**
   * Adds a rule that the string must be a valid ULID.
   */
  ulid(message?: string) {
    this.addRule(new IsULIDRule(message));
    return this;
  }

  build() {
    return super.build();
  }
}
