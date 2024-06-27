"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const router = express_1.default.Router();
router.post("/create-course", (0, validateRequest_1.default)(course_validation_1.courseValidations.createCourseValidationSchema), course_controller_1.CourseControllers.createCourse);
router.get("/", course_controller_1.CourseControllers.getAllCourse);
router.get("/:id", course_controller_1.CourseControllers.getSingleCourse);
router.patch("/:id", (0, validateRequest_1.default)(course_validation_1.courseValidations.updateCourseValidationSchema), course_controller_1.CourseControllers.updateSingleCourse);
router.delete("/:id", course_controller_1.CourseControllers.deleteSingleCourse);
exports.CourseRoute = router;
