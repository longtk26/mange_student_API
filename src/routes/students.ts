import { Router } from "express";
import {
    getStudents,
    getStudent,
    newStudent,
    updateStudent,
    deleteStudent,
} from "../controllers/studentController";

const studentsRoute = Router();

studentsRoute.get("/", getStudents);
studentsRoute.get("/:id", getStudent);
studentsRoute.post("/new", newStudent);
studentsRoute.put("/:id", updateStudent);
studentsRoute.delete("/:id", deleteStudent);

export default studentsRoute;
