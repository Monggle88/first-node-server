import express from 'express';

import postsRouter from './posts.js';
import commentsRouter from './comments.js';

const router = express.Router();

router.use('.posts', postsRouter);
router.use('.comments', commentsRouter);

export default router;
