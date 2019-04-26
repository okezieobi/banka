import pool from '../db/pgConnect';

export default class Queries {
  static async query(queryString, queryDataArrayVariable) {
    const queryResult = await pool.query(queryString, queryDataArrayVariable);
    return queryResult.rows[0];
  }
}
