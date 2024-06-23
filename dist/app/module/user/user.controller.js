"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
// create student
const createStudent = (0, catchAsync_1.default)(async (req, res) => {
    const { password, student: studentData } = req.body;
    const result = await user_service_1.UserServices.createStudentIntoDB(password, studentData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Student is created successfully",
        data: result,
    });
});
// create admin
const createAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { password, admin: adminData } = req.body;
    const result = await user_service_1.UserServices.createAdminIntoDB(password, adminData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Admin is created successfully",
        data: result,
    });
});
// create faculty
const createFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const { password, faculty: facultyData } = req.body;
    const result = await user_service_1.UserServices.createAdminIntoDB(password, facultyData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Faculty is created successfully",
        data: result,
    });
});
const deleteUser = (0, catchAsync_1.default)(async (req, res) => {
    const { userId } = req.params;
    const result = await user_service_1.UserServices.deleteUserFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Delete User is successfully",
        data: result,
    });
});
const getAllUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserServices.getAllUsersFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Data fetch successfully",
        data: result,
    });
});
const getSingleUser = (0, catchAsync_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const result = await user_service_1.UserServices.getSingleUsersFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single Data fetch successfully",
        data: result,
    });
});
exports.UserControllers = {
    createStudent,
    createAdmin,
    deleteUser,
    getAllUser,
    getSingleUser,
    createFaculty,
};
