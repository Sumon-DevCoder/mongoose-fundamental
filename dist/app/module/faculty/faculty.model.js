"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = void 0;
const mongoose_1 = require("mongoose");
const faculty_constant_1 = require("./faculty.constant");
const appError_1 = __importDefault(require("../../error/appError"));
const http_status_1 = __importDefault(require("http-status"));
const UserNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
});
const FacultySchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    designation: { type: String, required: true },
    name: { type: UserNameSchema, required: true },
    gender: { type: String, enum: { values: faculty_constant_1.Gender }, required: true },
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: { values: faculty_constant_1.BloodGroup },
        required: true,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: { type: String, required: true },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicDepartment", // ref
        required: true,
    },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
// 🤷‍♂️ virtual field create
FacultySchema.virtual("fullName").get(function () {
    var _a, _b, _c;
    return (((_a = this === null || this === void 0 ? void 0 : this.name) === null || _a === void 0 ? void 0 : _a.firstName) +
        " " +
        ((_b = this === null || this === void 0 ? void 0 : this.name) === null || _b === void 0 ? void 0 : _b.middleName) +
        " " +
        ((_c = this === null || this === void 0 ? void 0 : this.name) === null || _c === void 0 ? void 0 : _c.lastName) +
        " ");
});
// 🤷‍♂️ isFacultyDataExists -- in create time checking
FacultySchema.pre("save", async function (next) {
    console.log("hitting");
    const isDepartmentExists = await exports.Faculty.findOne({
        name: this.name,
        email: this.email,
    });
    console.log("hitting", isDepartmentExists);
    if (isDepartmentExists) {
        throw new appError_1.default(http_status_1.default.CONFLICT, `Department is already exists!`);
    }
    next();
});
exports.Faculty = (0, mongoose_1.model)("Faculty", FacultySchema);
