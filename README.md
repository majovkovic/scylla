# Scylla Validator

[![NPM Version](https://img.shields.io/npm/v/scylla-validator.svg)](https://www.npmjs.com/package/scylla-validator)
[![License](https://img.shields.io/npm/l/scylla-validator)](https://github.com/majovkovic/scylla-validator/blob/main/LICENSE)

**Scylla Validator** is simple, schema-like validator built with TypeScript. It provides easy-to-use APIs for validating different types of data including strings, numbers, arrays, objects, dates, and more. Scylla Validator was designed to be flexible, intuitive, and developer-friendly, making it ideal for form validation and schema-based data validation in both browser and Node.js environments.

## Features

- **Schema-Like Validation**: Define complex validation rules in a simple, declarative way.
- **Multiple Validators**: Over 70 in-built validators for different types such as strings, arrays, and more.
- **Customizable Messages**: Customize error messages based on your specific use cases.
- **Chainable API**: Compose and chain validation rules fluently.
- **Modular & Lightweight**: Only import what you need.

## Installation

To install Scylla Validator, simply run:

```bash
npm install scylla-validator
```
or with yarn
```bash
yarn add scylla-validator
```

## Quick Start

Start by importing the validator and defining a simple validation schema.

```typescript
import { scylla } from 'scylla-validator';

const schema = scylla.object({
  username: scylla.string().min(5).max(15),
  email: scylla.string().email(),
  age: scylla.number().min(18).max(99),
});

const data = {
  username: 'JohnDoe',
  email: 'john.doe@example.com',
  age: 25,
};

const errors = scylla.validate(schema, data);

console.log(errors);
// {}
```
### Custom Validation Messages

```typescript
const passwordSchema = scylla
    .string({ message: 'Password must be strong' })
    .min(8, 'Password must have at least 8 characters.');
```

## API Reference

`scylla.array()`
`scylla.string()`
`scylla.boolean()`
`scylla.date()`
`scylla.file()`
`scylla.number()`
`scylla.record()`
`scylla.tuple()`
`scylla.object()`

### Helpers

`scylla.helpers.pick()`
`scylla.helpers.omit()`
`scylla.helpers.partial()`
`scylla.helpers.extend()`
`scylla.helpers.merge()`

### Validation Execution

`scylla.validate(schema, data)`


## Contributing

Feel free to open issues, suggest features, or submit pull requests. Contributions are welcome!

- Fork the repository.
- Clone your fork
- Create a new branch (git checkout -b feature/my-new-feature)
- Make your changes
- Commit your changes (git commit -m 'Add my new feature')
- Push your branch (git push origin feature/my-new-feature)
- Open a pull request


## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

For any inquiries or support, reach out at majovkovic@gmail.com.
