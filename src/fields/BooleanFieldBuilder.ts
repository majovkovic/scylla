import { SharedFieldBuilder } from '~/fields/SharedFieldBuilder';
import { IsBooleanRule, IsTrueRule, IsFalseRule } from '~/rules/boolean';
import { BuilderFieldOptions } from '~/types';

export class BooleanFieldBuilder extends SharedFieldBuilder<boolean> {
  constructor({ message, name }: BuilderFieldOptions = {}) {
    super(name || 'defaultBooleanName', 'boolean');
    this.addRule(new IsBooleanRule(message));
  }

  /**
   * Adds a rule that the field must be explicitly true.
   */
  true(message?: string) {
    this.addRule(new IsTrueRule(message));
    return this;
  }

  /**
   * Adds a rule that the field must be explicitly false.
   */
  false(message?: string) {
    this.addRule(new IsFalseRule(message));
    return this;
  }

  build() {
    return super.build();
  }
}
