"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// UserName Zod Schema
const userNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .max(20, { message: "First name should have a maximum length of 20" })
        .refine((value) => /^[A-Z][a-zA-Z]*$/.test(value), {
        message: "First name is not in capitalize format",
    }),
    middleName: zod_1.z
        .string()
        .max(20, { message: "Middle name should have a maximum length of 20" })
        .optional(),
    lastName: zod_1.z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
        message: "Last name is not valid",
    }),
});
// Guardian Zod Schema
const guardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().trim().nonempty("Father name is required"),
    fatherOccupation: zod_1.z.string().nonempty("Father occupation is required"),
    fatherContactNo: zod_1.z.string().nonempty("Father contact number is required"),
    motherName: zod_1.z.string().nonempty("Mother name is required"),
    motherOccupation: zod_1.z.string().nonempty("Mother occupation is required"),
    motherContactNo: zod_1.z.string().nonempty("Mother contact number is required"),
});
// LocalGuardian Zod Schema
const localGuardianVaildationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Local guardian name is required"),
    occupation: zod_1.z.string().nonempty("Local guardian occupation is required"),
    contactNo: zod_1.z.string().nonempty("Local guardian contact number is required"),
    address: zod_1.z.string().nonempty("Local guardian address is required"),
});
// Student Zod Schema
const studentValidationSchema = zod_1.z.object({
    id: zod_1.z.string().nonempty("ID is required"),
    name: userNameValidationSchema,
    gender: zod_1.z.enum(["male", "female", "other"], {
        errorMap: () => ({
            message: "The gender field can only be one of the following values: male, female, other",
        }),
    }),
    dateOfBirth: zod_1.z.string().optional(),
    email: zod_1.z
        .string()
        .email({ message: "Email is not a valid email" })
        .nonempty("Email is required"),
    contactNumber: zod_1.z.string().nonempty("Contact number is required"),
    bloodGroup: zod_1.z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
    presentAddress: zod_1.z.string().nonempty("Present address is required"),
    permanentAddress: zod_1.z.string().nonempty("Permanent address is required"),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianVaildationSchema,
    profileImg: zod_1.z.string().optional(),
    isActive: zod_1.z.enum(["active", "inActive"]).default("active"),
});
exports.default = studentValidationSchema;
