import express from "express";
import { login, replace } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login); 
router.post("/replace", replace);

export default router;