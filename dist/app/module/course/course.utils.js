"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const course_model_1 = require("./course.model");
const courseIdIsExists = async (id) => {
    const isDataExists = await course_model_1.Course.findById(id);
    if (!isDataExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "data not found!");
    }
};
exports.default = courseIdIsExists;
