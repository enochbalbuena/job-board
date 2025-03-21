const Joi = require('joi');

const clientSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  company: Joi.string().optional(),
  website: Joi.string().uri().optional(),
  createdAt: Joi.date()
});

module.exports = clientSchema;
