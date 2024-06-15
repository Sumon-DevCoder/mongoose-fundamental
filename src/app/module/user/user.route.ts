import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validationRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/create-student",
  validationRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent
);
router.delete("/:userId", UserControllers.deleteUser);
router.get("/", UserControllers.getAllUser);
router.get("/:id", UserControllers.getSingleUser);

export const UserRoutes = router;
