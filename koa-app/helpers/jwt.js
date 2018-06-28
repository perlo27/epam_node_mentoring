import jwt from 'jsonwebtoken';

const secret = 'superSecret';

export default {
  sign(user) {
    return jwt.sign({ id: user.id }, secret);
  },
  verify(token) {
    return jwt.verify(token, secret);
  }
}