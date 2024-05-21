"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    fistName: {
        type: String,
        required: [true, "first name is required"],
        maxlength: 20,
        trim: true,
        // custom validation
        validate: {
            validator: function (value) {
                const firstNameString = value.charAt(0).toUpperCase() + value.slice(1);
                console.log(value);
                return firstNameString === value;
            },
            message: "{VALUE} is not capitalize format",
        },
    },
    middleName: {
        type: String,
        maxlength: 20,
    },
    lastName: {
        type: String,
        required: [true, "last name is required"],
        // npm package validation
        validate: {
            validator: (value) => validator_1.default.isAlpha(value),
            message: "{VALUE} is not valid",
        },
    },
});
const gurdianSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
        trim: true,
        required: true,
    },
    fatherOccupation: {
        type: String,
        required: true,
    },
    fatherContactNo: {
        type: String,
        required: true,
    },
    mohterName: {
        type: String,
        required: true,
    },
    motherOccupation: {
        type: String,
        required: true,
    },
    motherContactNo: {
        type: String,
        required: true,
    },
});
const localGurdianSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: userSchema,
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: "The gender field can only one of following field",
        },
        required: true,
    },
    dateOfBirth: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //    // npm package validation
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: "{VALUE} is not valid email type",
        },
    },
    contactNumber: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: {
        type: String,
        required: true,
    },
    parmanentAddress: {
        type: String,
        required: true,
    },
    guardian: {
        type: gurdianSchema,
        required: true,
    },
    localGurdian: {
        type: localGurdianSchema,
        required: true,
    },
    profileImg: { type: String },
    isActive: {
        type: String,
        enum: ["active", "inActive"],
        default: "active",
    },
});
exports.StudentModel = (0, mongoose_1.model)("Student", studentSchema);
