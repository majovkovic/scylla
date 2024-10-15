import { ValidationMonad } from '~/core';
import { Rule } from '~/rules';

export interface Schema<T> {
  validate(data: T): ValidationMonad<T>;
}

export interface Functor<T> {
  map<U>(fn: (value: T) => U): Functor<U>;
}

export interface Monad<T> extends Functor<T> {
  flatMap<U>(fn: (value: T) => Monad<U>): Monad<U>;
}

export interface ISchemaRule {
  validate(data: Map<string, any>): RuleValidationResult;
}

export type FieldDefinition = {
  name: string;
  type: string;
  rules: Rule<any>[];
};

export type ValidationResult = {
  valid: boolean;
  errors?: string[];
};

export type ValidationErrors = Map<string, string[]>;

export type OptionalFields = Set<string>;

export type RuleValidationResult = {
  valid: boolean;
  errors?: string[];
};

export type Constructor<T> = new (...args: any[]) => T;

export type AddSchemaErrors = (
  field: string,
  validation: ValidationResult,
  errors: ValidationErrors,
) => void;

export type BuilderFieldOptions = {
  message?: string;
  name?: string;
};
