import { object } from 'yup';
import { Request, Response, NextFunction } from 'express';
import { ParamException } from '../../../exceptions/param.exception.js';

export const validate = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const obj = {
      ...req.body,
      ...req.params,
      ...req.query,
    };

    const validatedData = await object().shape(schema).noUnknown().validate(obj, {
      abortEarly: false,
      stripUnknown: true,
    });

    Object.assign(req, { validatedData });
    return next();
  } catch (err: any) {
    console.log({ err: err.name, errors: err.errors });
    return res.errorResponse(new ParamException());
  }
};
