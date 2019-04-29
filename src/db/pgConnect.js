import {
  Pool,
} from 'pg';

import dotenv from 'dotenv';

dotenv.config();

const string = process.env.DATABASE_URL || process.env.DATABASE_URL_DEV;


const pool = new Pool({
  connectionString: string,
});


export default {
  query: (text, params) => pool.query(text, params),
};
