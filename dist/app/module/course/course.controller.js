"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const course_service_1 = require("./course.service");
// create
const createCourse = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await course_service_1.CourseServices.createCourseIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course data is created successfully",
        data: result,
    });
});
// get all data
const getAllCourse = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await course_service_1.CourseServices.getAllCourseFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course data is retrive successfully",
        data: result,
    });
});
// get single data
const getSingleCourse = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await course_service_1.CourseServices.getSingleCourseFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course single data is retrive successfully",
        data: result,
    });
});
// update single data
const updateSingleCourse = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await course_service_1.CourseServices.updateSingleCourseIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course single data is update successfully",
        data: result,
    });
});
// delete single data
const deleteSingleCourse = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await course_service_1.CourseServices.deleteSingleCourseIntoDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course single data is update successfully",
        data: result,
    });
});
exports.CourseControllers = {
    createCourse,
    getSingleCourse,
    updateSingleCourse,
    getAllCourse,
    deleteSingleCourse,
};
