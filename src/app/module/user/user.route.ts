import express from "express";
import { UserControllers } from "./user.controller";
import validationRequest from "../../middleware/validateRequest";
import { AdminValidations } from "../admin/admin.validation";
import { studentValidations } from "../student/student.validation";
import { facultyValidations } from "../faculty/faculty.validation";

const router = express.Router();

// create student
router.post(
  "/create-student",
  validationRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent
);

// create admin
router.post(
  "/create-admin",
  validationRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin
);

// create faculty
router.post(
  "/create-faculty",
  validationRequest(facultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty
);

router.get("/", UserControllers.getAllUser);

router.get("/:id", UserControllers.getSingleUser);

router.delete("/:userId", UserControllers.deleteUser);

export const UserRoutes = router;
