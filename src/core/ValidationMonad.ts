import { Monad } from '~/types';

export class ValidationMonad<T> implements Monad<T> {
  private readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  map<U>(fn: (value: T) => U): ValidationMonad<U> {
    return new ValidationMonad(fn(this.value));
  }

  flatMap<U>(fn: (value: T) => ValidationMonad<U>): ValidationMonad<U> {
    return fn(this.value);
  }

  getValue(): T {
    return this.value;
  }
}
