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
}
