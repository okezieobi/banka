import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export default class Token {
  static generate(id) {
    const token = jwt.sign({
      userId: id,
    }, process.env.SECRET, {
      expiresIn: 24 * 60 * 60,
    });
    return token;
  }

  static verify(token) {
    const decodedUser = jwt.verify(token, process.env.SECRET);
    return decodedUser;
  }
}
