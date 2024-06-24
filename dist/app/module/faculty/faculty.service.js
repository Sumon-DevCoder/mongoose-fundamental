"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const faculty_constant_1 = require("./faculty.constant");
const faculty_model_1 = require("./faculty.model");
const appError_1 = __importDefault(require("../../error/appError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const getAllFacultyFromDB = async (query) => {
    const FacultyQuery = new QueryBuilder_1.default(faculty_model_1.Faculty.find(), query)
        .search(faculty_constant_1.facultySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await FacultyQuery.modelQuery;
    return result;
};
const getSingleFacultyFromDB = async (id) => {
    const result = await faculty_model_1.Faculty.findById(id);
    return result;
};
const updateSingleFacultyIntoDB = async (id, payload) => {
    const result = await faculty_model_1.Faculty.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};
const deleteSingleFacultyFromDB = async (id) => {
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // tansacton - 1
        const deletedFaculty = await faculty_model_1.Faculty.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedFaculty) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete Faculty");
        }
        const deletedUser = await user_model_1.UserModel.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete User");
        }
        await session.commitTransaction(); // delete parmanently to database
        await session.endSession();
        return deletedUser;
    }
    catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};
exports.FacultyServices = {
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
    updateSingleFacultyIntoDB,
    deleteSingleFacultyFromDB,
};
