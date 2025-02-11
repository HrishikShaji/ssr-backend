import express from "express"
import { checkAuth, logIn, logOut, signUp } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);

export default router;


