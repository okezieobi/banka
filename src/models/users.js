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

  static createUserDataResponse(data) {
    const userResData = {
      id: parseInt(data.id, 10),
      firstName: String(data.firstName),
      lastName: String(data.lastName),
      email: String(data.email),
    };
    return userResData;
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
}