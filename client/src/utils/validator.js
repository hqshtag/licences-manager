import Joi from "@hapi/joi";

const reqSchema = {
  name: Joi.string()
    .min(6)
    .max(60)
    //.regex(/^[a-z ,.'-]+$/)
    .required(),
  phone: Joi.string().required(), //.regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(8)
    .required()
};

const optSchema = {
  address: Joi.string(),
  zip: Joi.string(), //.regex(/[0-9]{4,5}(-[0-9]{4})?/),
  country: Joi.string(),
  state: Joi.string()
};
const metaSchema = {
  numberPosts: Joi.number()
    .min(1)
    .max(1024)
    .required(), //number of posts
  duration: Joi.number()
    .min(30)
    .max(365)
};

const editorSchema = {
  name: Joi.string()
    .min(6)
    .max(60)
    //.regex(/^[a-z ,.'-]+$/)
    .required(),
  phone: Joi.string().required(), //.regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
  email: Joi.string()
    .email()
    .required(),
  address: Joi.string(),
  zip: Joi.string(), //.regex(/[0-9]{4,5}(-[0-9]{4})?/),
  country: Joi.string(),
  state: Joi.string(),
  numberPosts: Joi.number()
    .min(1)
    .max(1024)
    .required(), //number of posts
  duration: Joi.number()
    .min(30)
    .max(365)
};

const validateEditorFields = fields => {
  const { error } = Joi.validate({ ...fields }, editorSchema);
  if (error) return error.details[0].message;
  return true;
};

const validateOptionalFields = (address, country, state, zip) => {
  const { error } = Joi.validate({ address, country, state, zip }, optSchema);
  if (error) return error.details[0].message;
  return true;
};

const validateRequiredFields = (name, email, phone, password) => {
  const { error } = Joi.validate({ name, email, phone, password }, reqSchema);
  if (error) return error.details[0].message;
  return true;
};

const validateMetaFields = (numberPosts, duration) => {
  const { error } = Joi.validate({ numberPosts, duration }, metaSchema);
  if (error) return error.details[0].message;
  return true;
};

const Validator = {
  validateMetaFields,
  validateOptionalFields,
  validateRequiredFields,
  validateEditorFields
};

export default Validator;
