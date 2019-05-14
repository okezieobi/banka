import numbers from '../helpers/unique_no';
import bcrypt from '../helpers/bcrypt';

export default class Users {
  static userData(data) {
    const userReqData = {
      id: Math.floor(Math.random() * 1000000000),
      email: String(data.userEmail),
      firstName: String(data.userFirstName),
      lastName: String(data.userLastName),
      password: String(data.userPassword),
      type: 'Client',
      isAdmin: false,
    };
    return userReqData;
  }

  static userDataPostgre(data) {
    const {
      userEmail, userLastName, userFirstName, userPassword,
    } = data;
    const userReqData = {
      id: numbers.uniqueIds(),
      email: String(userEmail),
      firstName: String(userFirstName),
      lastName: String(userLastName),
      hashedPassword: bcrypt.hash(String(userPassword)),
    };
    return userReqData;
  }

  static createUserDataResponse(data) {
    const userResData = {
      id: data.id,
      firstName: String(data.firstName),
      lastName: String(data.lastName),
      email: String(data.email),
    };
    return userResData;
  }

  static createUserDataResPostgre(data) {
    const userResData = {
      id: data.id,
      firstName: String(data.first_name),
      lastName: String(data.last_name),
      email: String(data.email),
      type: String(data.type),
    };
    return userResData;
  }

  static createAdminStaffDataResPostgre(data) {
    const adminStaffData = {
      id: data.id,
      username: String(data.username),
      type: String(data.type),
    };
    return adminStaffData;
  }

  static adminStaffData(data) {
    const adminStaff = {
      id: Math.floor(Math.random() * 1000000000),
      username: String(data.username),
      password: String(data.password),
      isAdmin: true,
    };
    return adminStaff;
  }

  static staffData(data) {
    const staffInfo = {
      id: Math.floor(Math.random() * 1000000000),
      username: String(data.username),
      password: String(data.password),
      type: 'Staff',
      isAdmin: false,
    };
    return staffInfo;
  }

  static adminStaffDataPostgre(data) {
    const { userName, adminStaffPassword } = data;
    const staffInfo = {
      id: numbers.uniqueIds(),
      username: String(userName),
      hashedPassword: bcrypt.hash(String(adminStaffPassword)),
    };
    return staffInfo;
  }
}
