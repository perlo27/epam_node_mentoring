import jwt from 'jsonwebtoken';

export const secret = 'superSecret';

export default {
  sign(user) {
    return jwt.sign({ id: user.id }, secret);
  }
}