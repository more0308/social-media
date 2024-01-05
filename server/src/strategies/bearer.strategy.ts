import { Request } from 'express';
import jwt from 'jsonwebtoken';

import UserModel, { IUserModel } from '../db/models/user.model.js';
import { Scheme } from '../enums/auth.enum.js';
import { AuthException } from '../exceptions/auth.exception.js';
import { AbstractStrategy } from './abstract.strategy.js';
import { config } from '../config/config.js';

export class BearerStrategy extends AbstractStrategy {
  get name() {
    return 'bearer';
  }

  constructor(options: any = {}, verify: any) {
    super(options, verify);
  }

  authenticate(req: Request) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return this.error(new AuthException(`No authorization header`));
    }

    const { scheme, value } = BearerStrategy.parseAuthorizationHeader(authHeader) || {};

    if (!scheme || !value) {
      return this.error(new AuthException(`No ${Scheme.BEARER} token`));
    }

    const verified = (err: any, user: IUserModel, info: any): void => {
      if (err) {
        return this.error(err);
      }

      if (!user) {
        return this.fail(info);
      }

      this.success(user, info);
      return void 0;
    };

    try {
      if (this.includeReq) {
        this.verify(req, value, verified);
      } else {
        this.verify(value, verified);
      }
    } catch (e) {
      this.error(e);
    }
    return void 0;
  }

  public static parseAuthorizationHeader(hdrValue: string | any): any {
    if (typeof hdrValue !== 'string') {
      return null;
    }

    const [, scheme, value] = hdrValue.match(/(\S+)\s+(\S+)/) || [];
    return scheme && value && { scheme, value };
  }
}

export function bearerStrategyHandler() {
  return new BearerStrategy({ includeRequest: true }, async (req: Request, token: string, next: any) => {
    try {
      // @ts-ignore
      const { id } = jwt.verify(token, config.jwt.accessSecret);

      const userModel = await UserModel.findById(id);

      if (userModel === null) {
        throw new AuthException();
      }

      next(null, userModel, {});
    } catch (e) {
      next(new AuthException(), false);
    }
  });
}
