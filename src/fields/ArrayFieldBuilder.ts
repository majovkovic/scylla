import { SharedFieldBuilder } from '~/fields/SharedFieldBuilder';
import {
  IsArrayRule,
  MinItemsRule,
  MaxItemsRule,
  ContainsAllRule,
  ContainsRule,
  IsUniqueRule,
  HasDuplicatesRule,
  ItemsOfTypeRule,
} from '~/rules/array';
import { BuilderFieldOptions } from '~/types';

export class ArrayFieldBuilder extends SharedFieldBuilder<any[]> {
  constructor({ message, name }: BuilderFieldOptions = {}) {
    super(name || 'defaultArrayName', 'array');
    this.addRule(new IsArrayRule(message));
  }

  /**
   * Adds a rule that the array must have at least the specified minimum number of items.
   */
  min(min: number, message?: string) {
    this.addRule(new MinItemsRule(min, message));
    return this;
  }

  /**
   * Adds a rule that the array must have no more than the specified maximum number of items.
   */
  max(max: number, message?: string) {
    this.addRule(new MaxItemsRule(max, message));
    return this;
  }

  /**
   * Adds a rule that the array must contain all the specified items.
   */
  containsAll(items: any[], message?: string) {
    this.addRule(new ContainsAllRule(items, message));
    return this;
  }

  /**
   * Adds a rule that the array must contain the specified item.
   */
  contains(item: any, message?: string) {
    this.addRule(new ContainsRule(item, message));
    return this;
  }

  /**
   * Adds a rule that the array must contain only unique items.
   */
  unique(message?: string) {
    this.addRule(new IsUniqueRule(message));
    return this;
  }

  /**
   * Adds a rule that the array must contain duplicate items.
   */
  hasDuplicates(message?: string) {
    this.addRule(new HasDuplicatesRule(message));
    return this;
  }

  /**
   * Adds a rule that all items in the array must be of the specified type.
   */
  itemsType(type: string, message?: string) {
    this.addRule(new ItemsOfTypeRule(type, message));
    return this;
  }

  build() {
    return super.build();
  }
}
