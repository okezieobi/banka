import pool from '../db/pgConnect';

class Queries {
  static async getAllByRole(querySource, queryRole) {
    const queryStringFindAll = `SELECT * FROM ${querySource} WHERE ${queryRole} = $1`;
    const findAll = await pool.query(queryStringFindAll);
    return findAll;
  }

  static async verify(querySource, queryRole) {
    const verified = await this.getAllByRole(querySource, queryRole);
    return verified;
  }

  static async getOneByRole(querySource, queryParams, queryRole) {
    const queryStringFindOne = `SELECT * FROM ${querySource} WHERE ${queryParams} = $1 AND ${queryRole} = $2`;
    const findOne = await pool.query(queryStringFindOne);
    return findOne;
  }

  static async createOneByRole(querySource, arrayKeys, arrayValues, queryRole) {
    const queryStringCreateOne = `INSERT INTO ${querySource} (${arrayKeys.join(', ')}) VALUES (${arrayValues.join(', ')}) WHERE ${queryRole} = $${(arrayValues.length + 2)} RETURNING *`;
    const createOne = await pool.query(queryStringCreateOne);
    return createOne;
  }

  static async updateOneByRole(querySource, objectKeyValueArray, queryRole) {
    const queryStringUpdateOne = `UPDATE ${querySource} SET ${objectKeyValueArray.join(', ')} WHERE ${queryRole} =  $${(objectKeyValueArray.length + 2)} RETURNING *`;
    const updateOne = await pool.query(queryStringUpdateOne);
    return updateOne;
  }

  static async deleteOneByRole(querySource, queryParams, queryRole) {
    const queryStringDeleteOne = `DELETE FROM ${querySource} WHERE ${queryParams} = $1 AND ${queryRole} = $2`;
    const deleteOne = await pool.query(queryStringDeleteOne);
    return deleteOne;
  }
}

const queries = new Queries();

export default queries;
