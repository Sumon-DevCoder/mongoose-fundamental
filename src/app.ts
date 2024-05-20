import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/config/module/student/student.route";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application route
app.use("/api/v1/students", StudentRoutes);

// route
app.get("/", (req: Request, res: Response) => {
  res.send("server is running...");
});

export default app;
