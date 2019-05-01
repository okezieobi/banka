import {
  Pool,
} from 'pg';

import dotenv from 'dotenv';

dotenv.config();

const string = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: string,
});


export default {
  query: (text, params) => pool.query(text, params),
};
