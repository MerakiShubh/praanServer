import Router from "express";
import { createAuthenticateUser } from "../controllers/user.controller.js";
const router = Router();

router.route("/createuser").post(createAuthenticateUser);

export default router;
