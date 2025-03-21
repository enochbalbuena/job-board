const Joi = require('joi');

const jobSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  budget: Joi.number().min(0),
  status: Joi.string().valid('open', 'in progress', 'closed'),
  postedAt: Joi.date(),
  deadline: Joi.date(),
  clientId: Joi.string().hex().length(24),
  location: Joi.string(),
  skillsRequired: Joi.array().items(Joi.string())
});

module.exports = jobSchema;
