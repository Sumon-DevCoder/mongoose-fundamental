"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userNameSchema = joi_1.default.object({
    fistName: joi_1.default.string()
        .max(20)
        .trim()
        .required()
        .regex(/^[A-Z][a-zA-Z]*$/)
        .messages({
        "string.pattern.base": "{#label} is not capitalize format",
        "any.required": "First name is required",
        "string.max": "First name should have a maximum length of {#limit}",
    }),
    middleName: joi_1.default.string().max(20).allow(""),
    lastName: joi_1.default.string()
        .required()
        .custom((value, helpers) => {
        if (!/^[A-Za-z]+$/.test(value)) {
            return helpers.message({ "any.custom": "{#label} is not valid" });
        }
        return value;
    })
        .messages({
        "any.required": "Last name is required",
    }),
});
// Define Guardian validation schema
const guardianSchema = joi_1.default.object({
    fatherName: joi_1.default.string().trim().required().messages({
        "any.required": "Father name is required",
    }),
    fatherOccupation: joi_1.default.string().required().messages({
        "any.required": "Father occupation is required",
    }),
    fatherContactNo: joi_1.default.string().required().messages({
        "any.required": "Father contact number is required",
    }),
    mohterName: joi_1.default.string().required().messages({
        "any.required": "Mother name is required",
    }),
    motherOccupation: joi_1.default.string().required().messages({
        "any.required": "Mother occupation is required",
    }),
    motherContactNo: joi_1.default.string().required().messages({
        "any.required": "Mother contact number is required",
    }),
});
// Define LocalGuardian validation schema
const localGuardianSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        "any.required": "Local guardian name is required",
    }),
    occupation: joi_1.default.string().required().messages({
        "any.required": "Local guardian occupation is required",
    }),
    contactNo: joi_1.default.string().required().messages({
        "any.required": "Local guardian contact number is required",
    }),
    address: joi_1.default.string().required().messages({
        "any.required": "Local guardian address is required",
    }),
});
// Define Student validation schema
const studentSchema = joi_1.default.object({
    id: joi_1.default.string().required().messages({
        "any.required": "ID is required",
    }),
    name: userNameSchema.required().messages({
        "any.required": "Name is required",
    }),
    gender: joi_1.default.string().valid("male", "female", "other").required().messages({
        "any.only": "The gender field can only be one of the following values: male, female, other",
        "any.required": "Gender is required",
    }),
    dateOfBirth: joi_1.default.string().optional(),
    email: joi_1.default.string().email().required().messages({
        "string.email": "{#label} is not a valid email",
        "any.required": "Email is required",
    }),
    contactNumber: joi_1.default.string().required().messages({
        "any.required": "Contact number is required",
    }),
    bloodGroup: joi_1.default.string()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .optional()
        .messages({
        "any.only": "Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-",
    }),
    presentAddress: joi_1.default.string().required().messages({
        "any.required": "Present address is required",
    }),
    parmanentAddress: joi_1.default.string().required().messages({
        "any.required": "Permanent address is required",
    }),
    guardian: guardianSchema.required().messages({
        "any.required": "Guardian information is required",
    }),
    localGurdian: localGuardianSchema.required().messages({
        "any.required": "Local guardian information is required",
    }),
    profileImg: joi_1.default.string().optional(),
    isActive: joi_1.default.string()
        .valid("active", "inActive")
        .default("active")
        .messages({
        "any.only": "Status must be either active or inActive",
    }),
});
exports.default = studentSchema;
