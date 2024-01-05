import * as yup from 'yup';

export const login = {
  email: yup.string().required().email(),
  password: yup.string().required(),
};

export const register = {
  email: yup.string().required().email(),
  password: yup.string().required(),
  name: yup.string().required(),
  login: yup.string().required(),
};
