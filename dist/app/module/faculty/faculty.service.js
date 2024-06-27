"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
const faculty_utils_1 = __importDefault(require("./faculty.utils"));
const getAllFacultyFromDB = async (query) => {
    const FacultyQuery = new QueryBuilder_1.default(faculty_model_1.Faculty.find()
        .populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty",
        },
    })
        .populate("user"), query)
        .search(faculty_constant_1.facultySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await FacultyQuery.modelQuery;
    return result;
};
const getSingleFacultyFromDB = async (id) => {
    // isIdExists checking
    await (0, faculty_utils_1.default)(id);
    const result = await faculty_model_1.Faculty.findById(id)
        .populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty",
        },
    })
        .populate("user");
    return result;
};
const updateSingleFacultyIntoDB = async (id, payload) => {
    // isIdExists checking
    await (0, faculty_utils_1.default)(id);
    // non-primitive data descruting
    const { name } = payload, remainingFacultyData = __rest(payload, ["name"]);
    const modifiedUpdatedFacultyData = Object.assign({}, remainingFacultyData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedFacultyData[`name.${key}`] = value;
        }
    }
    const result = await faculty_model_1.Faculty.findByIdAndUpdate(id, modifiedUpdatedFacultyData, {
        new: true,
        runValidators: true,
    });
    return result;
};
const deleteSingleFacultyFromDB = async (id) => {
    // isIdExists checking
    await (0, faculty_utils_1.default)(id);
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // tansacton - 1
        const deletedFaculty = await faculty_model_1.Faculty.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        if (!deletedFaculty) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete Faculty");
        }
        // tansacton - 2
        const userId = deletedFaculty.user;
        const deletedUser = await user_model_1.UserModel.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete User");
        }
        await session.commitTransaction(); // delete parmanently to database
        await session.endSession();
        return { deletedFaculty, deletedUser };
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
