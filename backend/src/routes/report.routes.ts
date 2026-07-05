import { Router } from "express";
import { getReport } from "../controllers/report.controller";

const router = Router();

router.get("/report", getReport);

export default router;