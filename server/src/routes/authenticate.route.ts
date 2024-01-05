import { Router } from 'express';

import { AuthenticateHttpHandler } from '../handlers/http/authenticate.http.handler.js';
import { CallHttpMiddleware } from '../handlers/http/middlewares/call.http.middleware.js';
import { validate } from '../handlers/http/middlewares/validation.http.middleware.js';
import { login, register } from '../validations/authenticate.validation.js';
import { AuthenticateHttpMiddleware } from '../handlers/http/middlewares/authenticate.http.middleware.js';

const router = Router();

router.post('/login', validate(login), CallHttpMiddleware(AuthenticateHttpHandler, 'login'));
router.post('/register', validate(register), CallHttpMiddleware(AuthenticateHttpHandler, 'register'));
router.post('/logout', AuthenticateHttpMiddleware, CallHttpMiddleware(AuthenticateHttpHandler, 'logout'));

router.post('/token/refresh', CallHttpMiddleware(AuthenticateHttpHandler, 'refresh'));

export default router;
