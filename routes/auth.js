const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const {
  verifySignup,
  handleUserExistance,
  verifyUserExistance
} = require("../middleware/userValidator");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/signup", handleUserExistance, verifySignup, async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(bcryptSalt);
  const hashPass = await bcrypt.hash(password, salt);

  const user = new User({ username, password: hashPass });
  try {
    const savedUser = await user.save();
    savedUser.password = undefined;
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", verifySignup, verifyUserExistance, async (req, res) => {
  if (!res.locals.userExists)
    res.status(404).json({ message: "Username not registred" });
  else {
    const { username, password } = res.locals.user;
    const validPass = await bcrypt.compare(req.body.password, password);
    if (!validPass) res.status(400).json({ message: "Invalid password" });

    //create and assign a token
    const payload = {
      _id: res.locals.user._id
    };

    const privateKey = fs.readFileSync("private.key", "utf8");
    // const publicKey = fs.readFileSync("../public.key", "utf8");

    // SIGNING OPTIONS
    const signOptions = {
      expiresIn: "12h",
      algorithm: "RS256"
    };

    const token = jwt.sign(payload, privateKey, signOptions);

    res.header("auth-token", token).json({ "auth-token": token });
  }
});

router.get("/logout", (req, res) => {
  res.status(200).json({ message: "You are out!" });
});

module.exports = router;
