import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";
const app: Application = express();

// parser
app.use(cors()); // Enables cross-origin requests, interact with browser or client without cors policy
app.use(express.json()); // enable post request

// application route
app.use("/api/v1", router);

// home route
app.get("/", (req, res) => {
  res.send("🚀backend server is running...");
});

// global error handler
app.use(globalErrorHandler);
// route not found
app.use(notFound);

export default app;
