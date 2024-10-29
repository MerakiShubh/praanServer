import Router from "express";
import { getDeviceDataForDate } from "../controllers/getDeviceDataForDate.controller.js";

const router = Router();

router.route("/datafordate").get(getDeviceDataForDate);

export default router;
