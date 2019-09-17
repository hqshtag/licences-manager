const jwt = require("jsonwebtoken");
const fs = require("fs");

const options = {
  expiresIn: "12h",
  algorithm: ["RS256"]
};
const publicKey = fs.readFileSync("ssl/keys/public.key", "utf8");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) res.status(401).json({ message: "Access Denied" });
  else
    try {
      const verified = jwt.verify(token, publicKey, options);
      res.locals.user = verified;
      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid Token" });
    }
};

const checkToken = (req, res, next) => {
  const { token } = req.body;
  let verified = false;
  if (!token) {
    verified = false;
  } else
    try {
      verified = jwt.verify(token, publicKey, options);
    } catch (err) {
      verified = false;
    }
  res.locals.tokenVerified = verified;
  next();
};

module.exports = { verifyToken, checkToken };
