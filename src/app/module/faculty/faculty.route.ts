import express from "express";
import validationRequest from "../../middleware/validateRequest";
import { facultyValidations } from "./faculty.validation";
import { FacultryControllers } from "./faculty.controller";
const router = express.Router();

router.get("/", FacultryControllers.getAllFaculties);

router.get("/:facultyId", FacultryControllers.getSingleFacultry);

router.patch(
  "/:facultyId",
  validationRequest(facultyValidations.updateFacultyValidationSchema),
  FacultryControllers.updateSingleFacultry
);

export const AcademicFacultyRoutes = router;
