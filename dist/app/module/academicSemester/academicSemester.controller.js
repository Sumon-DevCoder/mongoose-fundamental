"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const academicSemester_service_1 = require("./academicSemester.service");
const createAcademicSemester = (0, catchAsync_1.default)(async (req, res) => {
    const result = await academicSemester_service_1.academicSemesterServices.createacademicSemesterIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "AcademicSemester is created successfully",
        data: result,
    });
});
const getAllAcademicSemester = (0, catchAsync_1.default)(async (req, res) => {
    const result = await academicSemester_service_1.academicSemesterServices.getAllAcademicSemesterFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Data fetch successfully",
        data: result,
    });
});
const getSingleAcademicSemester = (0, catchAsync_1.default)(async (req, res) => {
    const result = await academicSemester_service_1.academicSemesterServices.getSingleAcademicSemesterFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single data fetch successfully",
        data: result,
    });
});
const updateSingleAcademicSemester = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const SingleAcademicSemesterData = req.body;
    const result = await academicSemester_service_1.academicSemesterServices.updateSingleAcademicSemesterIntoDB(id, SingleAcademicSemesterData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "single data update successfully",
        data: result,
    });
});
exports.AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
    updateSingleAcademicSemester,
};
