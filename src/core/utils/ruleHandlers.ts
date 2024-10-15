import {
  AtLeastOneFieldRequiredRule,
  CrossFieldDependencyRule,
  GroupValidationRule,
  MutualExclusivityRule,
} from '~/rules/schema';
import {
  Constructor,
  RuleValidationResult,
  AddSchemaErrors,
  OptionalFields,
  ValidationErrors,
} from '~/types';

export const createRuleHandlers = (
  addSchemaErrors: AddSchemaErrors,
  optionalFields: OptionalFields,
  errors: ValidationErrors,
) => {
  return new Map<
    Constructor<any>,
    (rule: any, validation: RuleValidationResult) => void
  >([
    [
      AtLeastOneFieldRequiredRule,
      (rule: AtLeastOneFieldRequiredRule, validation) => {
        addSchemaErrors('schema', validation, errors);
        if (validation.valid) {
          rule.fields.forEach((field) => optionalFields.add(field));
        }
      },
    ],
    [
      MutualExclusivityRule,
      (rule: MutualExclusivityRule, validation) => {
        addSchemaErrors('schema', validation, errors);
        if (validation.valid) {
          rule.fields.forEach((field) => optionalFields.add(field));
        }
      },
    ],
    [
      CrossFieldDependencyRule,
      (rule: CrossFieldDependencyRule, validation) => {
        addSchemaErrors('schema', validation, errors);
      },
    ],
    [
      GroupValidationRule,
      (rule: GroupValidationRule, validation) => {
        addSchemaErrors('schema', validation, errors);
      },
    ],
  ]);
};
