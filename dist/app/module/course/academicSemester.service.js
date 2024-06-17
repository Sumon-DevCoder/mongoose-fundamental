"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterServices = void 0;
const appError_1 = __importDefault(require("../../error/appError"));
const course_constant_1 = require("./course.constant");
const academicSemester_model_1 = require("./academicSemester.model");
const createacademicSemesterIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // relation between semesterName and semesterCode for checking
    if (course_constant_1.academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new appError_1.default(400, "Invalid Semester Code");
    }
    const result = yield academicSemester_model_1.academicSemesterModel.create(payload);
    return result;
});
const getAllAcademicSemesterFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.academicSemesterModel.find();
    return result;
});
const getSingleAcademicSemesterFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.academicSemesterModel.findOne({ _id: id });
    return result;
});
const updateSingleAcademicSemesterIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.name &&
        payload.code &&
        course_constant_1.academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new appError_1.default(400, "Invalid Semester Code");
    }
    const result = yield academicSemester_model_1.academicSemesterModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
exports.academicSemesterServices = {
    createacademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFromDB,
    updateSingleAcademicSemesterIntoDB,
};
