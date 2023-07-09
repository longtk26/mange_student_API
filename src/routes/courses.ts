import { Router } from "express";

const coursesRoute = Router();

coursesRoute.get("/", (req, res) => {
    res.json({ message: "Hello this is service for API courses" });
});

export default coursesRoute;
