import * as yup from 'yup';
import config from '../config/validation.js';

export const getUser = {
  login: yup.string().required(),
};

export const getUsers = {
  query: yup.string().required(),
};

export const follow = {
  id: yup.string().matches(config.regexObjectId).required(),
};
