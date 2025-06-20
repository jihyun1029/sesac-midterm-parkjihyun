const jwt = require('jsonwebtoken');
const SECRET_KEY = "sessac";

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (e) {
    return false;
  }
}

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const verifiedToken = verifyToken(token);

  if (!verifiedToken) {
    return next(new Error("TokenNotMatched"));
  }

  req.user = verifiedToken.userId;
  next();
};