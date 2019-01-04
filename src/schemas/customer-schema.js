import Ajv from 'ajv';

let schema = {
  type: 'object',
  properties: {
    first_name: { type: 'string', minLength: 1, maxLength: 50 },
    last_name: { type: 'string', minLength: 1, maxLength: 50 },
    email: { type: 'string', format: 'email' }
  },
  required: ['first_name', 'last_name', 'email']
};

let ajv = new Ajv({ allErrors: true });

let customerSchema = ajv.compile(schema);

export default customerSchema;
