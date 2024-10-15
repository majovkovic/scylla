import { SharedFieldBuilder } from '~/fields/SharedFieldBuilder';
import { IsTupleRule, TupleElementTypeRule } from '~/rules/tuple';
import { BuilderFieldOptions } from '~/types';

export class TupleFieldBuilder extends SharedFieldBuilder<any[]> {
  constructor(length: number, { message, name }: BuilderFieldOptions = {}) {
    super(name || 'defaultTupleName', 'tuple');
    this.addRule(new IsTupleRule(length, message));
  }

  /**
   * Adds a rule that the elements in the tuple must match the specified types.
   */
  elementTypes(elementTypes: string[], message?: string) {
    this.addRule(new TupleElementTypeRule(elementTypes, message));
    return this;
  }

  build() {
    return super.build();
  }
}
