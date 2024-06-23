"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartment = void 0;
const mongoose_1 = require("mongoose");
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const academicDepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "AcademicFaculty", // reference
    },
}, { timestamps: true });
// in create time department isExist checking
academicDepartmentSchema.pre("save", async function (next) {
    const isDepartmentExists = await exports.AcademicDepartment.findOne({
        name: this.name,
    });
    if (isDepartmentExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, `Department is already exists!`);
    }
    next();
});
// in update time isIdExist checking
academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
    const query = this.getQuery();
    const isDepartmentExists = await exports.AcademicDepartment.findOne(query);
    if (!isDepartmentExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "This Department does not exists!");
    }
    next();
});
exports.AcademicDepartment = (0, mongoose_1.model)("AcademicDepartment", academicDepartmentSchema);
