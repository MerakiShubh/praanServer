import Router from "express";
import { getRealTimeData } from "../controllers/realtimedata.controller.js";

const router = Router();

router.route("/real-time").get(getRealTimeData);

export default router;
