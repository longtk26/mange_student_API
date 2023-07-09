import { Router } from "express";
import { getStudents } from "../controllers/studentController";

const studentsRoute = Router();

studentsRoute.get("/", getStudents);

export default studentsRoute;
