"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterServices = void 0;
const appError_1 = __importDefault(require("../../error/appError"));
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemester_model_1 = require("./academicSemester.model");
const createacademicSemesterIntoDB = async (payload) => {
    // relation between semesterName and semesterCode for checking
    if (academicSemester_constant_1.academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new appError_1.default(400, "Invalid Semester Code");
    }
    const result = await academicSemester_model_1.academicSemesterModel.create(payload);
    return result;
};
const getAllAcademicSemesterFromDB = async () => {
    const result = await academicSemester_model_1.academicSemesterModel.find();
    return result;
};
const getSingleAcademicSemesterFromDB = async (id) => {
    const result = await academicSemester_model_1.academicSemesterModel.findOne({ _id: id });
    return result;
};
const updateSingleAcademicSemesterIntoDB = async (id, payload) => {
    if (payload.name &&
        payload.code &&
        academicSemester_constant_1.academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new appError_1.default(400, "Invalid Semester Code");
    }
    const result = await academicSemester_model_1.academicSemesterModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
exports.academicSemesterServices = {
    createacademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFromDB,
    updateSingleAcademicSemesterIntoDB,
};
