const Joi = require('joi');

exports.headerFind = Joi.number().integer().min(1900).max(new Date().getFullYear()).optional();

exports.headerFindAll = Joi.object({
  'index': Joi.number().min(0).required()
}).options({ abortEarly: false }).unknown(true);

exports.bodyReplace = Joi.object({
  'movie': Joi.string().required(),
  'find': Joi.string().required(),
  'replace': Joi.string().required()
}).options({ abortEarly: false }).unknown(true);
    