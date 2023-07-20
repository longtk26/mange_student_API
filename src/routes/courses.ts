import { Router } from "express";
import {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
} from "../controllers/courseController";

const coursesRoute = Router();

coursesRoute.get("/", getCourses);
coursesRoute.get("/:id", getCourse);
coursesRoute.post("/new", createCourse);
coursesRoute.put("/:id", updateCourse);
coursesRoute.delete("/:id", deleteCourse);

export default coursesRoute;
