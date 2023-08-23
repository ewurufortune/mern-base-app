import express from "express";
import { login ,saveUsers,replaceUser} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login); 

router.post("/replace", replaceUser);
router.post("/saveUsers", saveUsers);

export default router;