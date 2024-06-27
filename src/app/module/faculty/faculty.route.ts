import { Router } from "express";
import { FacultryControllers } from "./faculty.controller";
import validationRequest from "../../middleware/validateRequest";
import { facultyValidations } from "./faculty.validation";

const router = Router();

router.get("/", FacultryControllers.getAllFaculties);

router.get("/:id", FacultryControllers.getSingleFacultry);

router.patch(
  "/:id",
  validationRequest(facultyValidations.updateFacultyValidationSchema),
  FacultryControllers.updateSingleFacultry
);

router.delete("/:id", FacultryControllers.deleteSingleFaculty);

export const FacultyRoutes = router;
