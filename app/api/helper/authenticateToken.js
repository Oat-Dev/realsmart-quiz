const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ status: 401, message: "Unauthorized Token" });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
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
