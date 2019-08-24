const Licence = require("../models/Licence");
const licenceKey = require("license-key-gen");
const Joi = require("@hapi/joi");

const verifyLicenceId = (req, res, next) => {
  let id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).json({
      message: "Invalide licence Id."
    });
  } else {
    next();
  }
};

const verifyNewLicence = (req, res, next) => {
  const schema = {
    client: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
      name: Joi.string()
        .min(6)
        .max(60)
        //.regex(/^[a-z ,.'-]+$/)
        .required(),
      phone: Joi.string(), //.regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
      adress: Joi.string(),
      zip: Joi.string(), //.regex(/[0-9]{4,5}(-[0-9]{4})?/),
      country: Joi.string(),
      state: Joi.string()
    },
    meta: {
      numberPosts: Joi.number()
        .min(1)
        .max(1024)
        .required(), //number of posts
      duration: Joi.number()
        .min(30)
        .max(365)
    }
  };

  const { error } = Joi.validate(req.body, schema);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else next();
};

const verifyLicenceUpdateRequest = (req, res, next) => {
  const schema = {
    client: {
      email: Joi.string().email(),
      password: Joi.string().min(8),
      name: Joi.string()
        .min(6)
        .max(60),
      //.regex(/^[a-z ,.'-]+$/),
      phone: Joi.string(), //.regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
      adress: Joi.string(),
      zip: Joi.string(), //.regex(/[0-9]{4,5}(-[0-9]{4})?/),
      country: Joi.string(),
      state: Joi.string()
    },
    meta: {
      numberPosts: Joi.number()
        .min(1)
        .max(1024), //number of posts
      duration: Joi.number()
        .min(30)
        .max(365)
    }
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else next();
};

const verifyLicenceExistance = async (req, res, next) => {
  const { client } = req.body;
  try {
    let result = licenceKey.createLicense({
      info: client,
      prodCode: "L2048"
    });
    const licence = await Licence.findOne({ licence: result.license });
    if (licence) {
      res.locals.licenceExists = true;
      res.locals.licence = licence;
      next();
    } else {
      res.locals.licenceExists = false;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const handleLicenceExistance = async (req, res, next) => {
  const { client } = req.body;
  try {
    let result = licenceKey.createLicense({
      info: client,
      prodCode: "L2048"
    });
    const licence = await Licence.findOne({ licence: result.license });
    if (licence)
      res.status(409).json({ message: "Licence already exists on the server" });
    else next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verifyLicenceExistance,
  verifyLicenceId,
  verifyLicenceUpdateRequest,
  verifyNewLicence,
  handleLicenceExistance
};
