import express from "express";
import { StudentControllers } from "./student.controller";
import validationRequest from "../../middleware/validateRequest";
import { studentValidations } from "./student.validation";

const router = express.Router();

router.get("/", StudentControllers.getAllStudents);

router.get("/:studentId", StudentControllers.getSingleStudent);

router.delete("/:studentId", StudentControllers.deleteSingleStudent);

router.patch(
  "/:studentId",
  validationRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateSingleStudent
);

export const StudentRoutes = router;
