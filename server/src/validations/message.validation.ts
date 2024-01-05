import * as yup from 'yup';
import config from '../config/validation.js';

export const create = {
  chat: yup.string().matches(config.regexObjectId).required(),
  text: yup.string().required(),
};

export const list = {
  id: yup.string().matches(config.regexObjectId).required(),
};
