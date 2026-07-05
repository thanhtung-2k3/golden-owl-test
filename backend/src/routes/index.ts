import { Router } from "express";

import studentRoutes from "./student.routes";
import reportRoutes from "./report.routes";

const createRouter = (): Router => {
    const router = Router();
    
    router.use(studentRoutes);
    router.use(reportRoutes);
    return router
}


export default createRouter;