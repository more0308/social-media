import { Router } from 'express';

import postRouter from './post.route.js';
import authRouter from './authenticate.route.js';
import userRouter from './user.route.js';
import chatRouter from './chat.route.js';
import messageRouter from './message.route.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/message', messageRouter);
router.use('/chat', chatRouter);
router.use('/post', postRouter);

export default router;
