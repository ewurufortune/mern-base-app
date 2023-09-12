import express from 'express';
import { getFeedPosts, getUserPosts, createPost, likePost } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);
router.post('/createPost', createPost);
router.patch('/:id/like', verifyToken, likePost);

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost);

export default router;
