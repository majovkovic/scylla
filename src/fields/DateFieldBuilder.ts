import { SharedFieldBuilder } from '~/fields/SharedFieldBuilder';
import {
  IsDateRule,
  IsBeforeDateRule,
  IsAfterDateRule,
  IsBetweenDatesRule,
  IsTodayRule,
  IsFutureDateRule,
  IsPastDateRule,
  IsExactDateRule,
} from '~/rules/date';
import { BuilderFieldOptions } from '~/types';

export class DateFieldBuilder extends SharedFieldBuilder<string> {
  constructor({ message, name }: BuilderFieldOptions = {}) {
    super(name || 'defaultDateName', 'date');
    this.addRule(new IsDateRule(message));
  }

  /**
   * Adds a rule that the date must be before the specified date.
   */
  before(beforeDate: string, message?: string) {
    this.addRule(new IsBeforeDateRule(beforeDate, message));
    return this;
  }

  /**
   * Adds a rule that the date must be after the specified date.
   */
  after(afterDate: string, message?: string) {
    this.addRule(new IsAfterDateRule(afterDate, message));
    return this;
  }

  /**
   * Adds a rule that the date must fall between two specific dates.
   */
  between(startDate: string, endDate: string, message?: string) {
    this.addRule(new IsBetweenDatesRule(startDate, endDate, message));
    return this;
  }

  /**
   * Adds a rule that the date must be today’s date.
   */
  today(message?: string) {
    this.addRule(new IsTodayRule(message));
    return this;
  }

  /**
   * Adds a rule that the date must be in the future.
   */
  future(message?: string) {
    this.addRule(new IsFutureDateRule(message));
    return this;
  }

  /**
   * Adds a rule that the date must be in the past.
   */
  past(message?: string) {
    this.addRule(new IsPastDateRule(message));
    return this;
  }

  /**
   * Adds a rule that the date must match the specified exact date.
   */
  exact(exactDate: string, message?: string) {
    this.addRule(new IsExactDateRule(exactDate, message));
    return this;
  }

  build() {
    return super.build();
  }
}
