import { CompositeRule } from '~/rules';
import {
  ValidatorFunctor,
  ValidationMonad,
  createRuleHandlers,
  addSchemaErrors,
} from '~/core';
import {
  Constructor,
  FieldDefinition,
  ISchemaRule,
  OptionalFields,
  Schema,
  ValidationErrors,
} from '~/types';

export class ObjectSchema implements Schema<Map<string, any>> {
  readonly fields: Map<string, FieldDefinition>;
  readonly schemaRules: ISchemaRule[] = [];

  constructor(
    fields: Map<string, FieldDefinition>,
    schemaRules: ISchemaRule[] = [],
  ) {
    this.fields = fields;
    this.schemaRules = schemaRules;
  }

  validate(data: Map<string, any>): ValidationMonad<Map<string, any>> {
    let errors: ValidationErrors = new Map<string, string[]>();
    const allData = Object.fromEntries(data);
    let optionalFields: OptionalFields = new Set<string>();

    const ruleHandlers = createRuleHandlers(
      addSchemaErrors,
      optionalFields,
      errors,
    );

    this.schemaRules.forEach((rule) => {
      const validation = rule.validate(data);

      const ruleHandler = ruleHandlers.get(
        rule.constructor as Constructor<any>,
      );
      if (ruleHandler) {
        ruleHandler(rule, validation);
      } else {
        addSchemaErrors('schema', validation, errors);
      }
    });

    this.fields.forEach(({ rules }, field) => {
      const value = data.get(field);
      const functor = new ValidatorFunctor(value);
      const compositeRule = new CompositeRule(rules);

      if (optionalFields.has(field) && !value) {
        return;
      }

      functor.map((val) => {
        const validation = compositeRule.validate(val, allData);
        if (!validation.valid) {
          errors.set(field, validation.errors || []);
        }
      });
    });

    return new ValidationMonad(errors);
  }
}
