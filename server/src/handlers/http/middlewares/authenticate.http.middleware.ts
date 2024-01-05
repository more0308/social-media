import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

import { Scheme } from '../../../enums/auth.enum.js';
import { AuthException } from '../../../exceptions/auth.exception.js';
import { BearerStrategy } from '../../../strategies/bearer.strategy.js';

export function AuthenticateHttpMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AuthException();
  }

  const { scheme, value } = BearerStrategy.parseAuthorizationHeader(authorization) || {};

  if (!scheme || !value) {
    return res.errorResponse(new AuthException());
  }
  // @ts-ignore
  const usageScheme = Scheme[scheme.toUpperCase()];
  if (!usageScheme) {
    return res.errorResponse(new AuthException());
  }
  return passport.authenticate(usageScheme, { session: false })(req, res, next);
}
