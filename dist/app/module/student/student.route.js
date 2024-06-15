"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const student_validation_1 = require("./student.validation");
const router = express_1.default.Router();
router.get("/", student_controller_1.StudentControllers.getAllStudents);
router.get("/:studentId", student_controller_1.StudentControllers.getSingleStudent);
router.delete("/:studentId", student_controller_1.StudentControllers.deleteSingleStudent);
router.patch("/:studentId", (0, validateRequest_1.default)(student_validation_1.studentValidations.updateStudentValidationSchema), student_controller_1.StudentControllers.updateSingleStudent);
exports.StudentRoutes = router;
