import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const JoiPassword = Joi.extend(joiPasswordExtendCore);

export const registerUserSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'string.required': 'Name should be required',
  }),
  email: Joi.string().trim().lowercase().email().required().messages({
    'email.email': 'Email should be valid email',
    'email.required': 'Email should be required',
  }),
  password: JoiPassword.string()
    .trim()
    .minOfUppercase(1)
    .minOfLowercase(1)
    .minOfSpecialCharacters(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .min(8)
    .required()
    .messages({
      'password.minOfUppercase':
        'Password must contain at least one uppercase letter',
      'password.minOfLowercase':
        'Password must contain at least one lowercase letter',
      'password.minOfSpecialCharacters':
        'Password must contain at least one special character',
      'password.minOfNumeric': 'Password must contain at least one number',
      'password.noWhiteSpaces': 'Password must not contain spaces',
      'password.min': 'Password should have at least {#limit} characters',
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    'email.email': 'Email should be valid email',
    'email.required': 'Email should be required',
  }),
  password: JoiPassword.string().trim().required().messages({
    'password.required': 'Password should be required',
  }),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'email.required': 'Email should be required',
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});