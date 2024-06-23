"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultryControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const faculty_service_1 = require("./faculty.service");
// get all data
const getAllFaculties = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await faculty_service_1.FacultyServices.getAllFacultyFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Faculties data is retrive successfully",
        data: result,
    });
});
// get single data
const getSingleFacultry = (0, catchAsync_1.default)(async (req, res, next) => {
    const { facultyId } = req.params;
    const result = await faculty_service_1.FacultyServices.getSingleFacultyFromDB(facultyId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Faculty single data is retrive successfully",
        data: result,
    });
});
// update single data
const updateSingleFacultry = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await faculty_service_1.FacultyServices.updateSingleFacultyIntoDB(req.params.facultyId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Faculty single data is update successfully",
        data: result,
    });
});
const deleteSingleFaculty = (0, catchAsync_1.default)(async (req, res, next) => {
    const { facultyId } = req.params;
    const result = await faculty_service_1.FacultyServices.deleteSingleFacultyFromDB(facultyId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Faculty single data is delete successfully",
        data: result,
    });
});
exports.FacultryControllers = {
    deleteSingleFaculty,
    getAllFaculties,
    getSingleFacultry,
    updateSingleFacultry,
};
