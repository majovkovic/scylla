import { Rule, CompositeRule } from '~/rules';
import {
  CustomValidationRule,
  EqualsRule,
  IsEmptyRule,
  IsNotEmptyRule,
  IsNoneOfRule,
  IsOneOfRule,
  IsOptionalRule,
  IsRequiredRule,
  IsMatchRule,
} from '~/rules/shared';

export class SharedFieldBuilder<T> {
  private readonly _name: string;
  private readonly _type: string;
  private rules: Rule<T>[] = [];

  constructor(name: string, type: string) {
    this._name = name;
    this._type = type;
  }

  addRule(rule: Rule<T>) {
    this.rules.push(rule);
    return this;
  }

  /**
   * Adds a custom validation rule based on a provided function.
   */
  custom(validateFn: (value: any) => boolean, message?: string) {
    return this.addRule(new CustomValidationRule(validateFn, message));
  }

  /**
   * Ensures that the field's value is equal to the provided expected value.
   */
  equals(expectedValue: any, message?: string) {
    return this.addRule(new EqualsRule(expectedValue, message));
  }

  /**
   * Ensures that the field is empty.
   */
  empty(message?: string) {
    return this.addRule(new IsEmptyRule(message));
  }

  /**
   * Ensures that the field is not empty.
   */
  notEmpty(message?: string) {
    return this.addRule(new IsNotEmptyRule(message));
  }

  /**
   * Marks the field as optional, allowing it to be omitted.
   */
  optional(message?: string) {
    return this.addRule(new IsOptionalRule(message));
  }

  /**
   * Marks the field as required, ensuring that it is present.
   */
  required(message?: string) {
    return this.addRule(new IsRequiredRule(message));
  }

  /**
   * Ensures that the field's value is one of the provided valid values.
   */
  oneOf(validValues: any[], message?: string) {
    return this.addRule(new IsOneOfRule(validValues, message));
  }

  /**
   * Ensures that the field's value is none of the provided invalid values.
   */
  noneOf(invalidValues: any[], message?: string) {
    return this.addRule(new IsNoneOfRule(invalidValues, message));
  }

  /**
   * Ensures that the value of the field matches the value of another field.
   */
  match(compareToField: string, message?: string) {
    return this.addRule(new IsMatchRule(compareToField, message));
  }

  build(): CompositeRule<T> {
    return new CompositeRule<T>(this.rules);
  }
}
