import bcrypt from 'bcryptjs';

export default class Password {
  static hash(password) {
    this.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
    return this.hashedPassword;
  }

  static compare(hashedPassword, password) {
    this.comparing = bcrypt.compareSync(password, hashedPassword);
    return this.comparing;
  }
}
