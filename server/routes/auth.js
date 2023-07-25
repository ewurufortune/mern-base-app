import express from "express";
import { login ,savewrestlers,replaceUser} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login); 

router.post("/replace", replaceUser);
router.post("/savewrestlers", savewrestlers);

export default router;