"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const admin_constant_1 = require("./admin.constant");
const UserNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
});
const AdminSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    designation: { type: String, required: [true, "designation is required"] },
    name: { type: UserNameSchema, required: [true, "Name is required"] },
    gender: {
        type: String,
        enum: {
            values: admin_constant_1.Gender,
            message: "{VALUE} is not a valid gender",
        },
        required: [true, "Gender is required"],
    },
    dateOfBirth: { type: Date, required: [true, "dateofBirth is required"] },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    bloodGroup: {
        type: String,
        BloodGroup: admin_constant_1.BloodGroup,
        required: [true, "BloodGroup is required"],
    },
    contactNo: { type: String, required: [true, "contactNo is required"] },
    emergencyContactNo: {
        type: String,
        required: [true, "emergencyNo is required"],
    },
    presentAddress: {
        type: String,
        required: [true, "presentAddress is required"],
    },
    permanentAddress: {
        type: String,
        required: [true, "permanentAddress is required"],
    },
    profileImage: { type: String, required: [true, "profileImg is required"] },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
exports.Admin = mongoose_1.default.model("Admin", AdminSchema);
