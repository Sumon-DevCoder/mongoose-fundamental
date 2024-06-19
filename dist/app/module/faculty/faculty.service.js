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
exports.FacultyServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const faculty_constant_1 = require("./faculty.constant");
const faculty_model_1 = require("./faculty.model");
const appError_1 = __importDefault(require("../../error/appError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
// const getAllAdminFromDB = async () => {
//   const result = await Admin.find();
//   return result;
// };
const getAllFacultyFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const FacultyQuery = new QueryBuilder_1.default(faculty_model_1.Faculty.find(), query)
        .search(faculty_constant_1.facultySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield FacultyQuery.modelQuery;
    return result;
});
const getSingleFacultyFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findById(id);
    return result;
});
const updateSingleFacultyIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteSingleFacultyFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // tansacton - 1
        const deletedFaculty = yield faculty_model_1.Faculty.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedFaculty) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete Faculty");
        }
        const deletedUser = yield user_model_1.UserModel.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete User");
        }
        yield session.commitTransaction(); // delete parmanently to database
        yield session.endSession();
        return deletedUser;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
exports.FacultyServices = {
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
    updateSingleFacultyIntoDB,
    deleteSingleFacultyFromDB,
};
