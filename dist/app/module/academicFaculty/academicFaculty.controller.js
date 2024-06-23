"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const academicFaculty_service_1 = require("./academicFaculty.service");
// create
const createAcademicFaculty = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await academicFaculty_service_1.AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Faculty data is created successfully",
        data: result,
    });
});
// get all data
const getAllAcademicFaculties = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await academicFaculty_service_1.AcademicFacultyServices.getAllAcademicFacultiesFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Faculties data is retrive successfully",
        data: result,
    });
});
// get single data
const getSingleAcademicFaculty = (0, catchAsync_1.default)(async (req, res, next) => {
    const { facultyId } = req.params;
    const result = await academicFaculty_service_1.AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Faculty single data is retrive successfully",
        data: result,
    });
});
// update single data
const updateSingleAcademicFaculty = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await academicFaculty_service_1.AcademicFacultyServices.updateSingleAcademicFacultyIntoDB(req.params.facultyId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Faculty single data is update successfully",
        data: result,
    });
});
exports.AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateSingleAcademicFaculty,
};
