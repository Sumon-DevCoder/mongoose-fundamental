"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const admin_validation_1 = require("../admin/admin.validation");
const student_validation_1 = require("../student/student.validation");
const faculty_validation_1 = require("../faculty/faculty.validation");
const router = express_1.default.Router();
// create student
router.post("/create-student", (0, validateRequest_1.default)(student_validation_1.studentValidations.createStudentValidationSchema), user_controller_1.UserControllers.createStudent);
// create admin
router.post("/create-admin", (0, validateRequest_1.default)(admin_validation_1.AdminValidations.createAdminValidationSchema), user_controller_1.UserControllers.createAdmin);
// create faculty
router.post("/create-faculty", (0, validateRequest_1.default)(faculty_validation_1.facultyValidations.createFacultyValidationSchema), user_controller_1.UserControllers.createAdmin);
router.get("/", user_controller_1.UserControllers.getAllUser);
router.get("/:id", user_controller_1.UserControllers.getSingleUser);
router.delete("/:userId", user_controller_1.UserControllers.deleteUser);
exports.UserRoutes = router;
