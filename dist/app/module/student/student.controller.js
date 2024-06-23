"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentControllers = void 0;
const student_service_1 = require("./student.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const getAllStudents = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await student_service_1.StudentServices.getAllStudentFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Student data is retrive successfully",
        data: result,
    });
});
const getSingleStudent = (0, catchAsync_1.default)(async (req, res, next) => {
    const { studentId } = req.params;
    const result = await student_service_1.StudentServices.getSingleStudentFromDB(studentId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Student single data is retrive successfully",
        data: result,
    });
});
const deleteSingleStudent = (0, catchAsync_1.default)(async (req, res, next) => {
    const { studentId } = req.params;
    const result = await student_service_1.StudentServices.deleteSingleStudentFromDB(studentId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Student single data is delete successfully",
        data: result,
    });
});
const updateSingleStudent = (0, catchAsync_1.default)(async (req, res, next) => {
    const { studentId } = req.params;
    const result = await student_service_1.StudentServices.updateSingleStudentFromDB(studentId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Student single data is updated successfully",
        data: result,
    });
});
exports.StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteSingleStudent,
    updateSingleStudent,
};
