import express from "express";
import { login, replace ,savewrestlers} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login); 
router.post("/replace", replace);
router.post("/savewrestlers", savewrestlers);

export default router;