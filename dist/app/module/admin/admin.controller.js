"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const admin_service_1 = require("./admin.service");
const getAllAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const result = await admin_service_1.AdminServices.getAllAdminFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "admin data is retrive successfully",
        data: result,
    });
});
const getSingleAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const result = await admin_service_1.AdminServices.getSingleAdminFromDB(req.params.adminId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "admin single data is retrive successfully",
        data: result,
    });
});
const updateSingleAdmin = (0, catchAsync_1.default)(async (req, res) => {
    console.log('controller update', req.params.adminId, req.body);
    const result = await admin_service_1.AdminServices.updateSingleAdminIntoDB(req.params.adminId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Admin single data is updated successfully",
        data: result,
    });
});
exports.AdminControllers = {
    getAllAdmin,
    getSingleAdmin,
    updateSingleAdmin,
};
