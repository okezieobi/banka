class Users {
  constructor() {
    this.users = {
      clients: [],
      admins: [],
      staff: [],
    };
  }


  UserList() {
    this.testUserOne = {
      id: 1010101010,
      email: 'foobar@mail.com',
      firstName: 'Foo',
      lastName: 'Bar',
      password: 'AbcDFer123*@is!',
      type: 'Client',
      isAdmin: false,
    };

    this.testUserTwo = {
      id: 2020202020,
      email: 'barfoo@mail.com',
      firstName: 'Bar',
      lastName: 'Foo',
      password: 'AbcDFer123*@is!',
      type: 'Client',
      isAdmin: false,
    };

    this.userDataList = [this.testUserOne, this.testUserTwo];
    this.users.clients.push(...this.userDataList);
  }


  staffList() {
    this.testStaffOne = {
      id: 3030303030,
      username: 'FooBar',
      password: 'AbcDFer123*@is!',
      type: 'Staff',
      isAdmin: false,
    };

    this.testStaffTwo = {
      id: 4040404040,
      username: 'BarFoo',
      password: 'AbcDFer123*@is!',
      type: 'Staff',
      isAdmin: false,
    };
    this.testStaffList = [this.testStaffOne, this.testStaffTwo];
    this.users.staff.push(...this.testStaffList);
  }

  adminList() {
    this.testAdminOne = {
      id: 5050505050,
      username: 'FooBar',
      password: 'AbcDFer123*@is!',
      isAdmin: true,
    };

    this.testAdminTwo = {
      id: 6060606060,
      username: 'BarFoo',
      password: 'AbcDFer123*@is!',
      isAdmin: true,
    };

    this.testAdminList = [this.testAdminOne, this.testAdminTwo];
    this.users.admins.push(...this.testAdminList);
  }
}

const users = new Users();

users.UserList();
users.staffList();
users.adminList();

export default users;
