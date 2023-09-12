import express from "express";
import { login ,saveUsers,replaceUser, createPost,getPosts,likePost} from "../controllers/auth.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/login", login); 

router.post("/replace", replaceUser);
router.post("/createPost", createPost);
router.post("/saveUsers", saveUsers);
// Make sure verifyToken middleware is applied before likePost
router.patch('/:id/likePost', verifyToken, likePost);
router.get('/getPosts', getPosts);


export default router;