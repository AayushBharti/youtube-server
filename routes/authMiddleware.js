const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.token;
    console.log(token);
    const decoded = jwt.verify(token, "mysecretkey");
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.send({
      authorized: false,
    });
  }
};

module.exports = authMiddleware;
