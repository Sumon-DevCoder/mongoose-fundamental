"use strict";
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
const faculty_model_1 = require("../faculty/faculty.model");
const admin_model_1 = require("../admin/admin.model");
// create student
const createStudentIntoDB = async (password, payload) => {
    // create a user object
    const userData = {};
    // if password not given use default password
    userData.password = password || config_1.default.default_password;
    // set student role
    userData.role = "student";
    // find academic semester info
    const admissionSemester = await academicSemester_model_1.academicSemesterModel.findById(payload.admissionSemester);
    if (!admissionSemester) {
        throw new appError_1.default(404, "admission semester not found");
    }
    // set mannually generate id
    userData.id = await (0, user_utils_1.generateStudentId)(admissionSemester);
    // Transaction Initialization
    const session = await mongoose_1.default.startSession();
    try {
        // Transaction Handling
        session.startTransaction();
        // create a user (transction - 1)
        const newUser = await user_model_1.UserModel.create([userData], { session });
        // create a student
        if (!newUser.length) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user");
        }
        else {
            payload.id = newUser[0].id; // embedded id
            payload.user = newUser[0]._id; // reference ids
        }
        // create a student (transction - 2)
        const newStudent = await student_model_1.Student.create([payload], { session });
        if (!newStudent.length) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create student");
        }
        await session.commitTransaction(); // if student and user create successfully commits transaction to save database permanently
        await session.endSession(); // Ends the database session.
        return newStudent;
    }
    catch (err) {
        await session.abortTransaction(); // If any error occurs during the process, aborts the transaction and ends the session.
        await session.endSession(); // ends the session.
        throw new appError_1.default(400, "student and user not created"); // throws the error.
    }
};
// create admin
const createAdminIntoDB = async (password, payload) => {
    // create a user obj
    const userData = {};
    // if password not given use default password
    userData.password = password || config_1.default.default_password;
    // set student role
    userData.role = "admin";
    // set mannually generate id
    userData.id = await (0, user_utils_1.generateAdminId)();
    // Transaction Initialization
    const session = await mongoose_1.default.startSession();
    try {
        // Transaction start
        session.startTransaction();
        // create a user (transction - 1)
        const newUser = await user_model_1.UserModel.create([userData], { session });
        // create a user
        if (!newUser.length) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user");
        }
        else {
            payload.id = newUser[0].id; // embedded id
            payload.user = newUser[0]._id; // reference id
        }
        // create a admin (transction - 2)
        const newAdmin = await admin_model_1.Admin.create([payload], { session });
        if (!newAdmin.length) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create Admin");
        }
        await session.commitTransaction(); // if admin and user create successfully commits transaction to save database permanently
        await session.endSession(); // Ends the database session.
        return newAdmin;
    }
    catch (err) {
        // console.log("hello", err);
        await session.abortTransaction(); // If any error occurs during the process, aborts the transaction and ends the session.
        await session.endSession(); // ends the session.
        throw new appError_1.default(400, err === null || err === void 0 ? void 0 : err.message); // throws the error.
    }
};
// create faculty
const createFacultyIntoDB = async (password, payload, next) => {
    // create a user object
    const userData = {};
    // if password not given use default password
    userData.password = password || config_1.default.default_password;
    // set student role
    userData.role = "faculty";
    // set mannually generate id
    userData.id = await (0, user_utils_1.generateFacultyId)();
    // Transaction Initialization
    const session = await mongoose_1.default.startSession();
    try {
        // Transaction start
        session.startTransaction();
        // create a user (transction - 1)
        const newUser = await user_model_1.UserModel.create([userData], { session });
        // create a user
        if (!newUser.length) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user");
        }
        else {
            payload.id = newUser[0].id; // embedded id
            payload.user = newUser[0]._id; // reference id
        }
        // create a faculty (transction - 2)
        const newFaculty = await faculty_model_1.Faculty.create([payload], { session });
        if (!newFaculty.length) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create faculty");
        }
        await session.commitTransaction(); // if admin and user create successfully commits transaction to save database permanently
        await session.endSession(); // Ends the database session.
        return { newFaculty, newUser };
    }
    catch (err) {
        await session.abortTransaction(); // If any error occurs during the process, aborts the transaction and ends the session.
        await session.endSession(); // ends the session.
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, err.message); // throws the error.
    }
};
// delete
const deleteUserFromDB = async (id) => {
    const result = await user_model_1.UserModel.updateOne({ id }, { isDeleted: true });
    return result;
};
const getAllUsersFromDB = async () => {
    const result = await user_model_1.UserModel.find();
    return result;
};
const getSingleUsersFromDB = async (id) => {
    // const result = await UserModel.findOne({ id });
    const result = await user_model_1.UserModel.aggregate([{ $match: { id: id } }]);
    return result;
};
exports.UserServices = {
    createAdminIntoDB,
    createStudentIntoDB,
    deleteUserFromDB,
    getAllUsersFromDB,
    getSingleUsersFromDB,
    createFacultyIntoDB,
};
