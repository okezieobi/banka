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
        id: Math.floor(Math.random() * 1000000000000000),
        email: String(data.userEmail),
        firstName: String(data.userFirstName),
        lastName: String(data.userLastName),
        password: String(data.userPassword),
        type: String(data.accountType),
        isAdmin: false
      };
      return this.userReqData;
    }
  }, {
    key: "createUserDataResponse",
    value: function createUserDataResponse(data) {
      this.userResData = {
        id: parseInt(data.userId, 10),
        firstName: String(data.userFirstName),
        lastName: String(data.userLastName),
        email: String(data.userEmail)
      };
      return this.userResData;
    }
  }, {
    key: "bankAccount",
    value: function bankAccount(data) {
      this.bankAccountData = {
        id: Math.floor(Math.random() * 1000000000000000),
        accountNumber: Math.floor(1000000000 + Math.random() * 9000000000),
        createdOn: new Date(),
        owner: parseInt(data.ownerId, 10),
        type: String(data.bankAccountType),
        status: String(data.bankAccountStatus),
        balance: parseFloat(data.bankAccountBalance)
      };
      return this.bankAccountData;
    }
  }, {
    key: "createBankAccountResponse",
    value: function createBankAccountResponse(data) {
      this.newBankAccountData = {
        accountNumber: parseInt(data.userId, 10),
        firstName: String(data.userFirstName),
        lastName: String(data.userLastName),
        email: String(data.userEmail),
        type: String(data.bankAccountType),
        openingBalance: parseFloat(data.bankAccountBalance)
      };
      return this.newBankAccountData;
    }
  }, {
    key: "transaction",
    value: function transaction(data) {
      this.transactionData = {
        id: Math.floor(Math.random() * 1000000000000000),
        createdOn: new Date(),
        type: String(data.transactionType),
        accountNumber: parseInt(data.accountNumber, 10),
        cashier: parseInt(data.cashierId, 10),
        amount: parseFloat(data.transactionAmount),
        oldBalance: parseFloat(data.accountBalance),
        newBalance: parseFloat(data.accountBalance) - parseFloat(data.transactionAmount)
      };
      return this.transactionData;
    }
  }, {
    key: "processTransaction",
    value: function processTransaction(data) {
      this.transactionResData = {
        transactionId: parseInt(data.transactionId, 10),
        accountNumber: String(data.accountNumber),
        amount: parseFloat(data.transactionAmount),
        cashier: parseInt(data.cashierId, 10),
        transactionType: String(data.transactionType),
        accountBalance: String(data.accountBalance - data.transactionAmount)
      };
      return this.transactionResData;
    }
  }, {
    key: "adminStaffData",
    value: function adminStaffData(data) {
      this.adminStaff = {
        id: Math.floor(Math.random() * 1000000000000000),
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
        id: Math.floor(Math.random() * 1000000000000000),
        username: String(data.username),
        password: String(data.password),
        type: String(data.accountType),
        isAdmin: false
      };
      return this.staffInfo;
    }
  }, {
    key: "UserList",
    value: function UserList() {
      var _this$users;

      this.testUserOne = {
        userEmail: 'foobar@com',
        userFirstName: 'Foo',
        userLastName: 'Bar',
        userPassword: 'Abcderg13#isfg',
        accountType: 'Client'
      };
      this.testUserTwo = {
        userEmail: 'barfoo@com',
        userFirstName: 'Bar',
        userLastName: 'Foo',
        userPassword: 'Abcderg13#isfg',
        accountType: 'Client'
      };
      this.testUserOneData = this.userData(this.testUserOne);
      this.testUserTwoData = this.userData(this.testUserTwo);
      this.userDataList = [this.testUserOneData, this.testUserTwoData];

      (_this$users = this.users).push.apply(_this$users, _toConsumableArray(this.userDataList));
    }
  }, {
    key: "bankAccountList",
    value: function bankAccountList() {
      var _this$bankAccounts;

      this.testBankAccountOneData = {
        ownerId: this.testUserOneData.id,
        bankAccountType: 'Savings',
        bankAccountStatus: 'Active',
        bankAccountBalance: '1000000'
      };
      this.testBankAccountTwoData = {
        ownerId: this.testUserTwoData.id,
        bankAccountType: 'Current',
        bankAccountStatus: 'Active',
        bankAccountBalance: '150000'
      };
      this.testBankAccountOne = this.bankAccount(this.testBankAccountOneData);
      this.testBankAccountTwo = this.bankAccount(this.testBankAccountTwoData);
      this.testBankAccountList = [this.testBankAccountOne, this.testBankAccountTwo];

      (_this$bankAccounts = this.bankAccounts).push.apply(_this$bankAccounts, _toConsumableArray(this.testBankAccountList));
    }
  }, {
    key: "staffList",
    value: function staffList() {
      var _this$staff;

      this.testStaffOneData = {
        username: 'FooBar',
        password: '12345ABC#',
        accountType: 'staff'
      };
      this.testStaffTwoData = {
        username: 'BarFoo',
        password: '12345ABC#',
        accountType: 'staff'
      };
      this.testStaffOne = this.staffData(this.testStaffOneData);
      this.testStaffTwo = this.staffData(this.testStaffTwoData);
      this.testStaffList = [this.testStaffOne, this.testStaffTwo];

      (_this$staff = this.staff).push.apply(_this$staff, _toConsumableArray(this.testStaffList));
    }
  }, {
    key: "adminList",
    value: function adminList() {
      var _this$admins;

      this.testAdminOneData = {
        username: 'FooBar',
        password: '12345ABC#'
      };
      this.testAdminTwoData = {
        username: 'BarFoo',
        password: '12345ABC#'
      };
      this.testAdminOne = this.adminStaffData(this.testAdminOneData);
      this.testAdminTwo = this.adminStaffData(this.testAdminTwoData);
      this.testAdminList = [this.testAdminOne, this.testAdminTwo];

      (_this$admins = this.admins).push.apply(_this$admins, _toConsumableArray(this.testAdminList));
    }
  }, {
    key: "transactionList",
    value: function transactionList() {
      var _this$transactions;

      this.testTransactionOneData = {
        transactionType: 'Credit',
        accountNumber: this.testBankAccountOne.accountNumber,
        cashierId: this.testStaffOne.id,
        transactionAmount: '10000',
        accountBalance: this.testBankAccountOne.balance
      };
      this.testTransactionTwoData = {
        transactionType: 'Debit',
        accountNumber: this.testBankAccountTwo.accountNumber,
        cashierId: this.testStaffTwo.id,
        transactionAmount: '14000',
        accountBalance: this.testBankAccountTwo.balance
      };
      this.testTransactionOne = this.transaction(this.testTransactionOneData);
      this.testTransactionTwo = this.transaction(this.testTransactionTwoData);
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