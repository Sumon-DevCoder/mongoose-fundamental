"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const faculty_validation_1 = require("./faculty.validation");
const faculty_controller_1 = require("./faculty.controller");
const router = express_1.default.Router();
router.get("/", faculty_controller_1.FacultryControllers.getAllFaculties);
router.get("/:facultyId", faculty_controller_1.FacultryControllers.getSingleFacultry);
router.patch("/:facultyId", (0, validateRequest_1.default)(faculty_validation_1.facultyValidations.updateFacultyValidationSchema), faculty_controller_1.FacultryControllers.updateSingleFacultry);
exports.AcademicFacultyRoutes = router;
