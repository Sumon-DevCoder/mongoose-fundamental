import express from "express";
import { AcademicFacultyControllers } from "./academicFaculty.controller";
import validationRequest from "../../middleware/validateRequest";
import { academicFacultyValidations } from "./academicFaculty.validation";
const router = express.Router();

router.post(
  "/create-academic-faculty",
  validationRequest(
    academicFacultyValidations.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.createAcademicFaculty
);

router.get("/", AcademicFacultyControllers.getAllAcademicFaculties);

router.get("/:facultyId", AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  "/:facultyId",
  validationRequest(
    academicFacultyValidations.UpdateAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.updateSingleAcademicFaculty
);

export const AcademicFacultyRoutes = router;
