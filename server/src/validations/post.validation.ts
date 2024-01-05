import * as yup from 'yup';
import config from '../config/validation.js';

export const getPost = {
  id: yup.string().matches(config.regexObjectId).required(),
};

export const createPost = {
  description: yup.string().required(),
};

export const like = {
  post_id: yup.string().required(),
};
