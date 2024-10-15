import { Rule } from '~/rules';
import { ValidatorFunctor } from '~/core';
import { IsOptionalRule } from '~/rules/shared';
import { ValidationResult } from '~/types';

export class CompositeRule<T> extends Rule<T> {
  private readonly rules: Rule<T>[];

  constructor(rules: Rule<T>[]) {
    super();
    this.rules = rules;
  }

  validate(value: T, allData?: Record<string, any>): ValidationResult {
    const isOptional = this.rules.some(
      (rule) => rule instanceof IsOptionalRule,
    );
    if (isOptional && (value === '' || value === undefined || value === null)) {
      return { valid: true, errors: undefined };
    }

    let functor = new ValidatorFunctor(value);
    let errors: string[] = [];

    this.rules.forEach((rule) => {
      functor = functor.map((val) => {
        const validation = rule.validate(val, allData);
        if (!validation.valid) {
          errors = [...errors, ...(validation.errors || [])];
        }
        return val;
      });
    });

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}
