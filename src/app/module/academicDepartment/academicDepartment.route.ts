import express from "express";
import validationRequest from "../../middleware/validateRequest";
import { academicDepartmentValidations } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
const router = express.Router();

router.post(
  "/create-academic-department",
  // validationRequest(
  //   academicDepartmentValidations.createAcademicDepartmentValidationSchema
  // ),
  AcademicDepartmentControllers.createAcademicDepartment
);

router.get("/", AcademicDepartmentControllers.getAllAcademicDepartment);

router.get(
  "/:departmentId",
  AcademicDepartmentControllers.getSingleAcademicDepartment
);

router.patch(
  "/:departmentId",
  validationRequest(
    academicDepartmentValidations.UpdateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.updateSingleAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
