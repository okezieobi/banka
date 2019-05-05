import path from 'path';
import { QueryFile } from 'pg-promise';

class Queries {
  static sql(file) {
    const fullPath = path.join(__dirname, file);
    return new QueryFile(fullPath, { minify: true });
  }
}

export default {
  deleteAll: Queries.sql('../seeders/deleteAll.sql'),
  users: {
    insertData: Queries.sql('../seeders/users.sql'),
  },
  accounts: {
    insertData: Queries.sql('../seeders/accounts.sql'),
  },
  transactions: {
    insertData: Queries.sql('../seeders/transactions.sql'),
  },
};
