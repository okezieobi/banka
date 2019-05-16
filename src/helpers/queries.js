export default class Queries {
  static findClientByEmail() {
    const queryEmail = 'SELECT * FROM clients WHERE email = $1';
    return queryEmail;
  }

  static findClientById() {
    const queryClientId = 'SELECT * FROM clients WHERE id = $1';
    return queryClientId;
  }

  static findAccountByNo() {
    const queryAccountNo = 'SELECT * FROM accounts WHERE number = $1';
    return queryAccountNo;
  }

  static findStaffById() {
    const queryStaffId = 'SELECT * FROM staff WHERE id = $1';
    return queryStaffId;
  }

  static findAdminById() {
    const queryAdminId = 'SELECT * FROM admins WHERE id = $1';
    return queryAdminId;
  }

  static findStaffByUsername() {
    const queryStaffUsername = 'SELECT * FROM staff WHERE username = $1';
    return queryStaffUsername;
  }

  static findAdminByUsername() {
    const queryAdminUsername = 'SELECT * FROM admins WHERE username = $1';
    return queryAdminUsername;
  }

  static createAdmin() {
    const createAdminQuery = 'INSERT INTO admins(id, username, password) VALUES ($1, $2, $3) RETURNING id, username, type';
    return createAdminQuery;
  }

  static createStaff() {
    const createStaffQuery = 'INSERT INTO staff(id, username, password) VALUES ($1, $2, $3) RETURNING id, username, type';
    return createStaffQuery;
  }

  static createClient() {
    const createClientQuery = 'INSERT INTO clients(id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email, type';
    return createClientQuery;
  }

  static updateAccount() {
    const updateAccountQuery = 'UPDATE accounts SET status = $1 WHERE id = $2 RETURNING *';
    return updateAccountQuery;
  }

  static deleteAccount() {
    const deleteAccountQuery = 'DELETE FROM accounts WHERE id = $1';
    return deleteAccountQuery;
  }

  static createAccount() {
    const createAccountQuery = 'INSERT INTO accounts(id, number, owner, type) VALUES ($1, $2, $3, $4) RETURNING *';
    return createAccountQuery;
  }
}
