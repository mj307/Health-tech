// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Shift } = initSchema(schema);

export {
  Shift
};