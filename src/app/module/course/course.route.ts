import express from "express";
import validationRequest from "../../middleware/validateRequest";
import { courseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";
const router = express.Router();

router.post(
  "/create-course",
  validationRequest(courseValidations.createCourseValidationSchema),
  CourseControllers.createCourse
);

router.get("/", CourseControllers.getAllCourse);

router.get("/:id", CourseControllers.getSingleCourse);

router.patch(
  "/:id",
  validationRequest(courseValidations.updateCourseValidationSchema),
  CourseControllers.updateSingleCourse
);

router.put(
  "/:courseId/assign-faculties",
  validationRequest(courseValidations.courseFacultyValidationSchema),
  CourseControllers.assignFacultiesWithCourse
);

router.delete(
  "/:courseId/remove-faculties",
  validationRequest(courseValidations.courseFacultyValidationSchema),
  CourseControllers.removeFacultiesWithCourse
);

router.delete("/:id", CourseControllers.deleteSingleCourse);

export const CourseRoute = router;
