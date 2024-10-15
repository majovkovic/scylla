import { ValidationResult } from '~/types';

export abstract class Rule<T = any> {
  protected message: string | undefined;

  protected constructor(message?: string) {
    this.message = message;
  }

  abstract validate(value: T, allData?: Record<string, any>): ValidationResult;
}
