"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const faculty_model_1 = require("./faculty.model");
const isFacultyIdExists = async (id) => {
    const isIdExists = await faculty_model_1.Faculty.findById(id);
    if (!isIdExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "data not found");
    }
};
exports.default = isFacultyIdExists;
