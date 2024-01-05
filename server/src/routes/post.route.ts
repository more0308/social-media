import { Router } from 'express';

import { PostHttpHandler } from '../handlers/http/post.http.handler.js';
import { CallHttpMiddleware } from '../handlers/http/middlewares/call.http.middleware.js';
import { AuthenticateHttpMiddleware } from '../handlers/http/middlewares/authenticate.http.middleware.js';
import { validate } from '../handlers/http/middlewares/validation.http.middleware.js';
import {createPost, getPost, like} from '../validations/post.validation.js';
import { processFileMiddleware } from '../handlers/http/middlewares/files.http.middleware.js';

const router = Router();

router.use(AuthenticateHttpMiddleware);

router.get('/', CallHttpMiddleware(PostHttpHandler, 'list'));
router.get('/:id', validate(getPost), CallHttpMiddleware(PostHttpHandler, 'get'));

router.post(
  '/',
  processFileMiddleware,
  validate(createPost),
  CallHttpMiddleware(PostHttpHandler, 'create'),
);
router.post('/like', validate(like), CallHttpMiddleware(PostHttpHandler, 'like'));
router.post('/dislike', validate(like), CallHttpMiddleware(PostHttpHandler, 'dislike'));

export default router;
