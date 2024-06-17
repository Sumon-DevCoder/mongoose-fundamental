import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validationRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/create-student",
  // validationRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent
);

router.get("/", UserControllers.getAllUser);

router.get("/:id", UserControllers.getSingleUser);

router.delete("/:userId", UserControllers.deleteUser);

export const UserRoutes = router;
