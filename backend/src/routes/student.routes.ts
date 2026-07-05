import { Router } from "express";
import { getStudentBySBD, getTop10GroupA } from "../controllers/student.controller";

const router = Router();

router.get("/students/:sbd", getStudentBySBD);
router.get("/top10-group-a", getTop10GroupA);

export default router;