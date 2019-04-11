"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Banka =
/*#__PURE__*/
function () {
  function Banka() {
    _classCallCheck(this, Banka);

    this.users = [];
    this.bankAccounts = [];
    this.transactions = [];
    this.admins = [];
    this.staff = [];
  }

  _createClass(Banka, [{
    key: "userData",
    value: function userData(data) {
      this.userReqData = {
        id: Math.floor(Math.random() * 1000000000),
        email: String(data.userEmail),
        firstName: String(data.userFirstName),
        lastName: String(data.userLastName),
        password: String(data.userPassword),
        type: 'Client',
        isAdmin: false
      };
      return this.userReqData;
    }
  }, {
    key: "createUserDataResponse",
    value: function createUserDataResponse(data) {
      this.userResData = {
        id: parseInt(data.id, 10),
        firstName: String(data.firstName),
        lastName: String(data.lastName),
        email: String(data.email)
      };
      return this.userResData;
    }
  }, {
    key: "bankAccount",
    value: function bankAccount(data) {
      this.bankAccountData = {
        id: Math.floor(Math.random() * 1000000000),
        accountNumber: Math.floor(100000000 + Math.random() * 900000000),
        createdOn: new Date(),
        owner: parseInt(data['owner-id'], 10),
        type: String(data.bankAccountType),
        status: 'Active',
        balance: 0.00
      };
      return this.bankAccountData;
    }
  }, {
    key: "createBankAccountResponse",
    value: function createBankAccountResponse(dataOne, dataTwo) {
      this.newBankAccountRes = {
        accountNumber: parseInt(dataOne.accountNumber, 10),
        firstName: String(dataTwo.firstName),
        lastName: String(dataTwo.lastName),
        email: String(dataTwo.email),
        type: String(dataOne.type),
        openingBalance: parseFloat(dataOne.balance)
      };
      return this.newBankAccountRes;
    }
  }, {
    key: "debitAccountTransaction",
    value: function debitAccountTransaction(dataOne, dataTwo, dataThree) {
      this.transactionData = {
        id: Math.floor(Math.random() * 1000000000),
        createdOn: new Date(),
        type: 'Debit',
        accountNumber: parseInt(dataTwo.account_number, 10),
        cashier: parseInt(dataThree['cashier-id'], 10),
        amount: parseFloat(dataOne.transactionAmount),
        oldBalance: parseFloat(dataTwo.accountBalance),
        newBalance: parseFloat((parseFloat(dataTwo.accountBalance) - parseFloat(dataOne.transactionAmount)).toFixed(2))
      };
      return this.transactionData;
    }
  }, {
    key: "creditAccountTransaction",
    value: function creditAccountTransaction(dataOne, dataTwo, dataThree) {
      this.transactionData = {
        id: Math.floor(Math.random() * 1000000000),
        createdOn: new Date(),
        type: 'Credit',
        accountNumber: parseInt(dataTwo.account_number, 10),
        cashier: parseInt(dataThree['cashier-id'], 10),
        amount: parseFloat(dataOne.transactionAmount),
        oldBalance: parseFloat(dataTwo.accountBalance),
        newBalance: parseFloat((parseFloat(dataTwo.accountBalance) + parseFloat(dataOne.transactionAmount)).toFixed(2))
      };
      return this.transactionData;
    }
  }, {
    key: "transactionResponse",
    value: function transactionResponse(data) {
      this.transactionResData = {
        transactionId: parseInt(data.id, 10),
        accountNumber: String(data.accountNumber),
        amount: parseFloat(data.amount),
        cashier: parseInt(data.cashier, 10),
        transactionType: String(data.type),
        accountBalance: String(data.newBalance)
      };
      return this.transactionResData;
    }
  }, {
    key: "adminStaffData",
    value: function adminStaffData(data) {
      this.adminStaff = {
        id: Math.floor(Math.random() * 1000000000),
        username: String(data.username),
        password: String(data.password),
        isAdmin: true
      };
      return this.adminStaff;
    }
  }, {
    key: "staffData",
    value: function staffData(data) {
      this.staffInfo = {
        id: Math.floor(Math.random() * 1000000000),
        username: String(data.username),
        password: String(data.password),
        type: 'Staff',
        isAdmin: false
      };
      return this.staffInfo;
    }
  }, {
    key: "UserList",
    value: function UserList() {
      var _this$users;

      this.testUserOne = {
        id: 1010101010,
        email: 'foobar@mail.com',
        firstName: 'Foo',
        lastName: 'Bar',
        password: 'AbcDFer123*@is!',
        type: 'Client',
        isAdmin: false
      };
      this.testUserTwo = {
        id: 2020202020,
        email: 'barfoo@mail.com',
        firstName: 'Bar',
        lastName: 'Foo',
        password: 'AbcDFer123*@is!',
        type: 'Client',
        isAdmin: false
      };
      this.userDataList = [this.testUserOne, this.testUserTwo];

      (_this$users = this.users).push.apply(_this$users, _toConsumableArray(this.userDataList));
    }
  }, {
    key: "bankAccountList",
    value: function bankAccountList() {
      var _this$bankAccounts;

      this.testBankAccountOne = {
        id: 1111111111,
        accountNumber: 1212121212,
        createdOn: new Date(),
        owner: this.testUserOne.id,
        type: 'Savings',
        status: 'Active',
        balance: 11000.00
      };
      this.testBankAccountTwo = {
        id: 3333333333,
        accountNumber: 1313131313,
        createdOn: new Date(),
        owner: this.testUserOne.id,
        type: 'Current',
        status: 'Active',
        balance: 12000.00
      };
      this.testBankAccountList = [this.testBankAccountOne, this.testBankAccountTwo];

      (_this$bankAccounts = this.bankAccounts).push.apply(_this$bankAccounts, _toConsumableArray(this.testBankAccountList));
    }
  }, {
    key: "staffList",
    value: function staffList() {
      var _this$staff;

      this.testStaffOne = {
        id: 3030303030,
        username: 'FooBar',
        password: 'AbcDFer123*@is!',
        type: 'Staff',
        isAdmin: false
      };
      this.testStaffTwo = {
        id: 4040404040,
        username: 'BarFoo',
        password: 'AbcDFer123*@is!',
        type: 'Staff',
        isAdmin: false
      };
      this.testStaffList = [this.testStaffOne, this.testStaffTwo];

      (_this$staff = this.staff).push.apply(_this$staff, _toConsumableArray(this.testStaffList));
    }
  }, {
    key: "adminList",
    value: function adminList() {
      var _this$admins;

      this.testAdminOne = {
        id: 5050505050,
        username: 'FooBar',
        password: 'AbcDFer123*@is!',
        isAdmin: true
      };
      this.testAdminTwo = {
        id: 6060606060,
        username: 'BarFoo',
        password: 'AbcDFer123*@is!',
        isAdmin: true
      };
      this.testAdminList = [this.testAdminOne, this.testAdminTwo];

      (_this$admins = this.admins).push.apply(_this$admins, _toConsumableArray(this.testAdminList));
    }
  }, {
    key: "transactionList",
    value: function transactionList() {
      var _this$transactions;

      this.testTransactionOne = {
        id: 7777777777,
        createdOn: new Date(),
        type: 'Credit',
        accountNumber: this.testBankAccountOne.accountNumber,
        cashier: this.testStaffOne.id,
        amount: 1000.00,
        oldBalance: 11000.00,
        newBalance: 10000.00
      };
      this.testTransactionTwo = {
        id: 8888888888,
        createdOn: new Date(),
        type: 'Credit',
        accountNumber: this.testBankAccountTwo.accountNumber,
        cashier: this.testStaffTwo.id,
        amount: 2000.00,
        oldBalance: 12000.00,
        newBalance: 10000.00
      };
      this.testTransactionList = [this.testTransactionOne, this.testTransactionTwo];

      (_this$transactions = this.transactions).push.apply(_this$transactions, _toConsumableArray(this.testTransactionList));
    }
  }]);

  return Banka;
}();

var banka = new Banka();
banka.UserList();
banka.bankAccountList();
banka.staffList();
banka.adminList();
banka.transactionList();
var _default = banka;
exports.default = _default;
//# sourceMappingURL=index.js.map