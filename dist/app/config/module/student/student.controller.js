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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentControllers = void 0;
const student_service_1 = require("./student.service");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student: studentData } = req.body;
        console.log(studentData);
        const result = yield student_service_1.StudentServices.createStudentDB(studentData);
        res.status(200).json({
            success: true,
            message: "Student is created successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
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
