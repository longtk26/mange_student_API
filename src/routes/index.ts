import { Router } from "express";
import studentsRoute from "./students";
import coursesRoute from "./courses";

const rootRouter = Router();

rootRouter.use("/students", studentsRoute);
rootRouter.use("/courses", coursesRoute);

export default rootRouter;
