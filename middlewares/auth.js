const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../configs/index');
const Unauthorized = require('../errors/Unauthorized');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Unauthorized('Необходима авторизация');
    }
    let payload;
    const token = authorization.replace('Bearer ', '');
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new Unauthorized('Необходима авторизация');
    }
    req.user = payload;
  } catch (err) {
    next(err);
  }
  next();
};
