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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = __importDefault(require("../../error/appError"));
const createStudentDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    // if password not given use default password
    userData.password = password || config_1.default.default_password;
    // set student role
    userData.role = "student";
    // find academic semester info
    const admissionSemester = yield academicSemester_model_1.academicSemesterModel.findById(payload.admissionSemester);
    // session
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // set mannually generate id
        userData.id = yield (0, user_utils_1.generateStudentId)(admissionSemester);
        // create a user (transction - 1)
        const newUser = yield user_model_1.UserModel.create([userData], { session });
        // create a student
        if (!newUser.length) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user");
        }
        else {
            payload.id = newUser[0].id; // embedded id
            payload.user = newUser[0]._id; // reference ids
        }
        // create a student (transction - 2)
        const newStudent = yield student_model_1.Student.create([payload], { session });
        if (!newStudent.length) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create student");
        }
        yield session.commitTransaction(); // for save database permanently
        yield session.endSession(); // end session
        return newStudent;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.updateOne({ id }, { isDeleted: true });
    return result;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find();
    return result;
});
const getSingleUsersFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await UserModel.findOne({ id });
    const result = yield user_model_1.UserModel.aggregate([{ $match: { id: id } }]);
    return result;
});
exports.UserServices = {
    createStudentDB,
    deleteUserFromDB,
    getAllUsersFromDB,
    getSingleUsersFromDB,
};