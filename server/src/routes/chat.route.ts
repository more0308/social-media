import { Router } from 'express';

import { CallHttpMiddleware } from '../handlers/http/middlewares/call.http.middleware.js';
import { AuthenticateHttpMiddleware } from '../handlers/http/middlewares/authenticate.http.middleware.js';
import { ChatHttpHandler } from '../handlers/http/chat.http.handler.js';
import { validate } from '../handlers/http/middlewares/validation.http.middleware.js';
import { get } from '../validations/chat.validation.js';

const router = Router();

router.use(AuthenticateHttpMiddleware);

router.get('/', CallHttpMiddleware(ChatHttpHandler, 'list'));
router.get('/user/:id', validate(get), CallHttpMiddleware(ChatHttpHandler, 'get'));

export default router;
