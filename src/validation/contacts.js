import Joi from 'joi';
import JoiPhoneNumber from 'joi-phone-number';

const JoiPhone = Joi.extend(JoiPhoneNumber);

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Contact name should be a string',
    'string.min': 'Contact name should have at least {#limit} characters',
    'string.max': 'Contact name should have at most {#limit} characters',
    'any.required': 'Contact name is required',
  }),
  phoneNumber: JoiPhone.string()
    .phoneNumber({ defaultCountry: 'UA' })
    .required()
    .messages({
      'string.base': 'Phone number should be a string',
      'string.phoneNumber': 'Phone number must be valid for Ukraine',
      'any.required': 'Phone number is required',
    }),
  email: Joi.string().email().optional().empty('').messages({
    'string.email': 'Email must be a valid email address',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be a boolean value',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': 'Contact type must be one of work, home, or personal',
      'any.required': 'Contact type is required',
    }),
}).unknown(false);

export const upDateContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Contact name should be a string',
    'string.min': 'Contact name should have at least {#limit} characters',
    'string.max': 'Contact name should have at most {#limit} characters',
  }),
  phoneNumber: JoiPhone.string()
    .phoneNumber({ defaultCountry: 'UA' })
    .messages({
      'string.base': 'Phone number should be a string',
      'string.phoneNumber': 'Phone number must be valid for Ukraine',
    }),
  email: Joi.string().email().messages({
    'string.email': 'Email must be a valid email address',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be a boolean value',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Contact type must be one of work, home, or personal',
  }),
}).unknown(false);
