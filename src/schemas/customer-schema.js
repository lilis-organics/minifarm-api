import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const schema = {
  type: 'object',
  properties: {
    first_name: { type: 'string', minLength: 1, maxLength: 50 },
    last_name: { type: 'string', minLength: 1, maxLength: 50 },
    email: { type: 'string', format: 'email' },
  },
  required: ['first_name', 'last_name', 'email'],
};

export function getCustomerSchema() {
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  return ajv.compile(schema);
}
