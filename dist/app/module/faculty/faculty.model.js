"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = void 0;
const mongoose_1 = require("mongoose");
const faculty_constant_1 = require("./faculty.constant");
const UserNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
});
const FacultySchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
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
        ref: "AcademicDepartment",
        required: true,
    },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
exports.Faculty = (0, mongoose_1.model)("Faculty", FacultySchema);
