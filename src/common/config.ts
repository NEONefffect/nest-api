import { config } from 'dotenv-flow';
import * as path from 'path';

const root = path.join.bind(this, __dirname);
config({ path: root('../../') });

export default {
  PORT: process.env.PORT || 3000,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  JWT_SECRET: process.env.JWT_SECRET,
  DB_CONNECT_URL: '',
};
