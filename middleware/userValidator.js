const Joi = require("@hapi/joi");
const User = require("../models/User");

const verifySignup = (req, res, next) => {
  const schema = {
    username: Joi.string()
      .min(4)
      .max(42)
      .required(),
    password: Joi.string()
      .min(4)
      .max(42)
      .required()
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else next();
};

const verifyUserExistance = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    res.locals.userExists = true;
    res.locals.user = user;
    next();
  } else {
    res.locals.userExists = false;
    next();
  }
};

const handleUserExistance = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    res.status(409).json({ message: "This username is already registred" });
  } else {
    next();
  }
};

module.exports = { handleUserExistance, verifySignup, verifyUserExistance };
