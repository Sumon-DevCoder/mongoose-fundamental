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
exports.StudentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("./student.model");
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const appError_1 = __importDefault(require("../../error/appError"));
const student_constant_1 = require("./student.constant");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const getAllStudentFromDB = async (query) => {
    // ---------------------------
    // Raw Searching mehtod
    // ---------------------------
    // const queryObj = { ...query };
    // let searchTerm = ""; // set default value
    // const studentSearchableFields = ["email", "name.firstName", "presentAddress"];
    // if (query?.searchTerm) {
    //   searchTerm = query?.searchTerm as string;
    // }
    // const searchQuery = Student.find({
    //   $or: studentSearchableFields.map((field) => ({
    //     [field]: { $regex: searchTerm, $options: "i" },
    //   })),
    // });
    // // filtering
    // const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    // excludeFields.forEach((el) => delete queryObj[el]); // delete method
    // console.log("base query", query, "query object", queryObj);
    // const filterQuery = searchQuery
    //   .find(queryObj)
    //   .populate("admissionSemester")
    //   .populate({
    //     path: "academicDepartment",
    //     populate: {
    //       path: "academicFaculty",
    //     },
    //   });
    // // sorting functionality
    // let sort = "-createdAt";
    // if (query.sort) {
    //   sort = query.sort as string;
    // }
    // const sortQuery = filterQuery.sort(sort);
    // // if page in given set it - pagination
    // let page = 1;
    // let skip = 0;
    // let limit = 1;
    // // limit functionality
    // if (query.limit) {
    //   limit = Number(query.limit);
    // }
    // if (query.page) {
    //   page = Number(query.page);
    //   skip = (page - 1) * limit;
    // }
    // const paginationQuery = sortQuery.skip(skip);
    // const limitQuery = paginationQuery.limit(limit);
    // // field limiting
    // let fields = "-__v";
    // if (query.fields) {
    //   fields = (query.fields as string).split(",").join(" "); // field : "name,email" --> field : name email
    // }
    // const fieldQuery = await limitQuery.select(fields);
    // console.log("fieldQuery", fieldQuery);
    // return fieldQuery;
    const studentQuery = new QueryBuilder_1.default(student_model_1.Student.find()
        .populate("admissionSemester")
        .populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty",
        },
    }), query)
        .search(student_constant_1.studentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await studentQuery.modelQuery;
    return result;
};
const getSingleStudentFromDB = async (id) => {
    const result = await student_model_1.Student.findOne({ id })
        .populate("admissionSemester")
        .populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty",
        },
    });
    return result;
};
const updateSingleStudentFromDB = async (id, payload) => {
    // descturing non premitive data from payload
    const { name, guardian, localGuardian } = payload, remainingStudentData = __rest(payload, ["name", "guardian", "localGuardian"]);
    const modifiedUpdatedData = Object.assign({}, remainingStudentData);
    // name
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    // guardian
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }
    // localGuardian
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }
    const result = await student_model_1.Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
};
const deleteSingleStudentFromDB = async (id) => {
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedStudent = await student_model_1.Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedStudent) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete student");
        }
        const deletedUser = await user_model_1.UserModel.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete user");
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
exports.StudentServices = {
    getAllStudentFromDB,
    deleteSingleStudentFromDB,
    getSingleStudentFromDB,
    updateSingleStudentFromDB,
};
