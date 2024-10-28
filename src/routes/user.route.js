import Router from "express";
import {
  createAuthenticateUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";
const router = Router();

router.route("/createuser").post(createAuthenticateUser);
router.route("/refreshtoken").post(refreshAccessToken);

export default router;
