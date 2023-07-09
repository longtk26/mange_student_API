import express from "express";
import rootRouter from "./routes/index";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", rootRouter);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to API manage student" });
});

app.listen(8080, () => {
    console.log("Server is running at http://localhost:8080");
});
