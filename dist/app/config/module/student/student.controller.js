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
exports.StudentControllers = void 0;
const student_service_1 = require("./student.service");
const student_validation_1 = __importDefault(require("./student.validation"));
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student: studentData } = req.body;
        // creating schema a validation using Joi
        // const { error, value } = studentSchema.validate(studentData);
        // creating schema a validation using Joi
        const zodParseData = student_validation_1.default.parse(studentData);
        const result = yield student_service_1.StudentServices.createStudentDB(zodParseData);
        if (error) {
            res.status(500).json({
                success: false,
                message: "kisu vul ase something went wrong",
                error: error.details,
            });
        }
        // console.log("my error", error, "my value", value);
        res.status(200).json({
            success: true,
            message: "Student is created successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error: err,
        });
    }
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getAllStudentFromDB();
        res.status(200).json({
            success: true,
            message: "Student data is retrive successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getStudentSingleItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.StudentServices.getStudentSingleValue(studentId);
        res.status(200).json({
            success: true,
            message: "Student single data is retrive successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.StudentControllers = {
    createStudent,
    getAllStudents,
    getStudentSingleItem,
};
