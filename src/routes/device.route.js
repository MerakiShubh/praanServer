import Router from "express";
import { addDevice } from "../controllers/device.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/adddevice").post(verifyJWT, addDevice);

export default router;
