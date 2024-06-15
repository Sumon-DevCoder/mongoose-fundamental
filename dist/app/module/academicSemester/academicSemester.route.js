"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const express_1 = __importDefault(require("express"));
const academicSemester_validation_1 = require("./academicSemester.validation");
const academicSemester_controller_1 = require("./academicSemester.controller");
const router = express_1.default.Router();
router.post("/create-academic-semester", (0, validateRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.CreateAcademicSemesterValidationSchema), academicSemester_controller_1.AcademicSemesterControllers.createAcademicSemester);
router.get("/", academicSemester_controller_1.AcademicSemesterControllers.getAllAcademicSemester);
router.get("/:id", academicSemester_controller_1.AcademicSemesterControllers.getSingleAcademicSemester);
router.put("/:id", (0, validateRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.UpdateAcademicSemesterValidationSchema), academicSemester_controller_1.AcademicSemesterControllers.updateSingleAcademicSemester);
exports.AcademicSemesterRoutes = router;
