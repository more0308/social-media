import { Router } from 'express';

import { CallHttpMiddleware } from '../handlers/http/middlewares/call.http.middleware.js';
import { AuthenticateHttpMiddleware } from '../handlers/http/middlewares/authenticate.http.middleware.js';
import { MessageHttpHandler } from '../handlers/http/message.http.handler.js';
import { validate } from '../handlers/http/middlewares/validation.http.middleware.js';
import { create, list } from '../validations/message.validation.js';

const router = Router();

router.use(AuthenticateHttpMiddleware);

router.post('/', validate(create), CallHttpMiddleware(MessageHttpHandler, 'create'));
router.get('/chat/:id', validate(list), CallHttpMiddleware(MessageHttpHandler, 'list'));
export default router;
