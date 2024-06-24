"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminSingleIdExists = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const admin_model_1 = require("./admin.model");
const isAdminSingleIdExists = async (id) => {
    const isDataExists = await admin_model_1.Admin.findById(id);
    if (!isDataExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "data not exists");
    }
};
exports.isAdminSingleIdExists = isAdminSingleIdExists;
