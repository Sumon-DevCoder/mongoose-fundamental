"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoutes = void 0;
const express_1 = require("express");
const faculty_controller_1 = require("./faculty.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const faculty_validation_1 = require("./faculty.validation");
const router = (0, express_1.Router)();
router.get("/", faculty_controller_1.FacultryControllers.getAllFaculties);
router.get("/:id", faculty_controller_1.FacultryControllers.getSingleFacultry);
router.patch("/:id", (0, validateRequest_1.default)(faculty_validation_1.facultyValidations.updateFacultyValidationSchema), faculty_controller_1.FacultryControllers.updateSingleFacultry);
router.delete("/:id", faculty_controller_1.FacultryControllers.deleteSingleFaculty);
exports.FacultyRoutes = router;
