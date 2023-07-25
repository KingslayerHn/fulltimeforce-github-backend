import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGO_DB: Joi.required(),
  PORT: Joi.number().required().default(4000),
  JWT_SECRET: Joi.string().required(),
  DEFAULT_LIMIT_PAGINATION: Joi.number().required().default(10),
});
