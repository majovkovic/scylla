import { SharedFieldBuilder } from '~/fields/SharedFieldBuilder';
import {
  IsNumberRule,
  MinNumberRule,
  MaxNumberRule,
  IsEvenRule,
  IsOddRule,
  IsIntegerRule,
  IsFloatRule,
  IsMultipleOfRule,
  IsPositiveRule,
  IsNegativeRule,
  IsBetweenRule,
} from '~/rules/number';
import { BuilderFieldOptions } from '~/types';

export class NumberFieldBuilder extends SharedFieldBuilder<number> {
  constructor({ message, name }: BuilderFieldOptions = {}) {
    super(name || 'defaultNumberName', 'number');
    this.addRule(new IsNumberRule(message));
  }

  /**
   * Adds a rule that the number must be greater than or equal to the specified minimum.
   */
  min(min: number, message?: string) {
    this.addRule(new MinNumberRule(min, message));
    return this;
  }

  /**
   * Adds a rule that the number must be less than or equal to the specified maximum.
   */
  max(max: number, message?: string) {
    this.addRule(new MaxNumberRule(max, message));
    return this;
  }

  /**
   * Adds a rule that the number must be even.
   */
  even(message?: string) {
    this.addRule(new IsEvenRule(message));
    return this;
  }

  /**
   * Adds a rule that the number must be odd.
   */
  odd(message?: string) {
    this.addRule(new IsOddRule(message));
    return this;
  }

  /**
   * Adds a rule that the number must be an integer.
   */
  integer(message?: string) {
    this.addRule(new IsIntegerRule(message));
    return this;
  }

  /**
   * Adds a rule that the number must be a float.
   */
  float(message?: string) {
    this.addRule(new IsFloatRule(message));
    return this;
  }

  /**
   * Adds a rule that the number must be a multiple of the specified divisor.
   */
  multipleOf(divisor: number, message?: string) {
    this.addRule(new IsMultipleOfRule(divisor, message));
    return this;
  }

  /**
   * Adds a rule that the number must be positive.
   */
  positive(message?: string) {
    this.addRule(new IsPositiveRule(message));
    return this;
  }

  /**
   * Adds a rule that the number must be negative.
   */
  negative(message?: string) {
    this.addRule(new IsNegativeRule(message));
    return this;
  }

  /**
   * Adds a rule that the number must fall between two specified values.
   */
  between(min: number, max: number, message?: string) {
    this.addRule(new IsBetweenRule(min, max, message));
    return this;
  }

  build() {
    return super.build();
  }
}
