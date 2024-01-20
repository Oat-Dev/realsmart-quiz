const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ status: 401, message: "Unauthorized Token" });
  }

  jwt.verify(token, process.env.jwtSecretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ status: 403, message: "Forbidden Token" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;