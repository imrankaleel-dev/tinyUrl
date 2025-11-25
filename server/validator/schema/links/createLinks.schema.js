const Joi = require("joi");

const createLinkSchema = Joi.object({
  link: Joi.string().uri().required(),
}).required();

module.exports = { createLinkSchema };
