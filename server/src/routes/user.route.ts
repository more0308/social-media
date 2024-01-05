import { Router } from 'express';

import { CallHttpMiddleware } from '../handlers/http/middlewares/call.http.middleware.js';
import { UserHttpHandler } from '../handlers/http/user.http.handler.js';
import { AuthenticateHttpMiddleware } from '../handlers/http/middlewares/authenticate.http.middleware.js';
import { validate } from '../handlers/http/middlewares/validation.http.middleware.js';
import { follow, getUser, getUsers } from '../validations/user.validation.js';

const router = Router();

router.use(AuthenticateHttpMiddleware);

router.get('/', validate(getUsers), CallHttpMiddleware(UserHttpHandler, 'list'));
router.get('/:login', validate(getUser), CallHttpMiddleware(UserHttpHandler, 'get'));

router.post('/follow', validate(follow), CallHttpMiddleware(UserHttpHandler, 'follow'));
router.post('/unfollow', validate(follow), CallHttpMiddleware(UserHttpHandler, 'unfollow'));

export default router;
