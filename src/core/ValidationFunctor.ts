import { Functor } from '~/types';

export class ValidatorFunctor<T> implements Functor<T> {
  private readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  map<U>(fn: (value: T) => U): ValidatorFunctor<U> {
    return new ValidatorFunctor(fn(this.value));
  }
}
