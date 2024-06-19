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

router.get("/:courseId", CourseControllers.getSingleCourse);

router.patch(
  "/:courseId",
  validationRequest(courseValidations.updateCourseValidationSchema),
  CourseControllers.updateSingleCourse
);

router.delete("/:courseId", CourseControllers.deleteSingleCourse);

export const CourseRoute = router;
