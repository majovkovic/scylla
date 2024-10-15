import { Rule } from '~/rules';
import { VALIDATION_ERROR_TUPLE_MESSAGES } from '~/constants/validationErrors';
import { ValidationResult } from '~/types';

export class TupleElementTypeRule extends Rule<any[]> {
  private readonly elementTypes: Map<number, string>;

  constructor(elementTypes: string[], message?: string) {
    super(message || VALIDATION_ERROR_TUPLE_MESSAGES.TUPLE_ELEMENT_TYPE);

    this.elementTypes = new Map(
      elementTypes.map((type, index) => [index, type]),
    );
  }

  validate(value: any[]): ValidationResult {
    const valid = value.every((element, index) => {
      const expectedType = this.elementTypes.get(index);
      return typeof element === expectedType;
    });

    return { valid, errors: valid ? undefined : [this.message!] };
  }
}
