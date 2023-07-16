import express from "express";
import {
  changeFirstName,
  getUser,
  
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
// router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id", verifyToken, changeFirstName);

export default router;