import * as yup from 'yup';
import config from '../config/validation.js';

export const get = {
  id: yup.string().matches(config.regexObjectId).required(),
};
