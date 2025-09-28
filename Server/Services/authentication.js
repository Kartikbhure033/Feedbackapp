const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || '999999';

function createTokenForUser(user) {
  const payload = {
    id: user._id,
    Fullname: user.Fullname,
    Email: user.Email,
    role: user.role
  };
  const token = jwt.sign(payload, secret, { expiresIn: '7d' });
  return token;
}

function validateTokenForUser(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateTokenForUser
};
