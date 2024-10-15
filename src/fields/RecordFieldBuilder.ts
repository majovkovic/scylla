import { SharedFieldBuilder } from '~/fields/SharedFieldBuilder';
import {
  IsRecordRule,
  HasKeyRule,
  HasKeysRule,
  MinKeysRule,
  MaxKeysRule,
} from '~/rules/record';
import { BuilderFieldOptions } from '~/types';

export class RecordFieldBuilder extends SharedFieldBuilder<any> {
  constructor({ message, name }: BuilderFieldOptions = {}) {
    super(name || 'defaultRecordName', 'record');
    this.addRule(new IsRecordRule(message));
  }

  /**
   * Adds a rule that the record must contain the specified key.
   */
  hasKey(key: string, message?: string) {
    this.addRule(new HasKeyRule(key, message));
    return this;
  }

  /**
   * Adds a rule that the record must contain all the specified keys.
   */
  hasKeys(keys: string[], message?: string) {
    this.addRule(new HasKeysRule(keys, message));
    return this;
  }

  /**
   * Adds a rule that the record must contain at least the specified number of keys.
   */
  minKeys(min: number, message?: string) {
    this.addRule(new MinKeysRule(min, message));
    return this;
  }

  /**
   * Adds a rule that the record must not contain more than the specified number of keys.
   */
  maxKeys(max: number, message?: string) {
    this.addRule(new MaxKeysRule(max, message));
    return this;
  }

  build() {
    return super.build();
  }
}
