"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const router = express_1.default.Router();
router.post("/create-academic-faculty", (0, validateRequest_1.default)(academicFaculty_validation_1.academicFacultyValidations.createAcademicFacultyValidationSchema), faculty_controller_1.AcademicFacultyControllers.createAcademicFaculty);
router.get("/", faculty_controller_1.AcademicFacultyControllers.getAllAcademicFaculties);
router.get("/:facultyId", faculty_controller_1.AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch("/:facultyId", (0, validateRequest_1.default)(academicFaculty_validation_1.academicFacultyValidations.UpdateAcademicFacultyValidationSchema), faculty_controller_1.AcademicFacultyControllers.updateSingleAcademicFaculty);
exports.AcademicFacultyRoutes = router;
