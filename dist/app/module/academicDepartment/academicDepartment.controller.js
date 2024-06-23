"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const academicDepartment_service_1 = require("./academicDepartment.service");
// create
const createAcademicDepartment = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await academicDepartment_service_1.AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Department data is created successfully",
        data: result,
    });
});
// get all data
const getAllAcademicDepartment = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await academicDepartment_service_1.AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Department data is retrive successfully",
        data: result,
    });
});
// get single data
const getSingleAcademicDepartment = (0, catchAsync_1.default)(async (req, res, next) => {
    const { departmentId } = req.params;
    const result = await academicDepartment_service_1.AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Department single data is retrive successfully",
        data: result,
    });
});
// update single data
const updateSingleAcademicDepartment = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await academicDepartment_service_1.AcademicDepartmentServices.updateSingleAcademicDepartmentIntoDB(req.params.departmentId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Department single data is update successfully",
        data: result,
    });
});
exports.AcademicDepartmentControllers = {
    createAcademicDepartment,
    getSingleAcademicDepartment,
    updateSingleAcademicDepartment,
    getAllAcademicDepartment,
};
