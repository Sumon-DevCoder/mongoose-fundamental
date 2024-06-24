"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyValidations = void 0;
const zod_1 = require("zod");
const faculty_constant_1 = require("./faculty.constant");
const createUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string(),
});
const createFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        faculty: zod_1.z.object({
            user: zod_1.z.string().optional(), // ref id
            designation: zod_1.z.string(),
            name: createUserNameValidationSchema,
            gender: zod_1.z.enum([...faculty_constant_1.Gender]),
            dateOfBirth: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
                message: "Invalid date format",
            }),
            email: zod_1.z.string().email(),
            contactNo: zod_1.z.string(),
            emergencyContactNo: zod_1.z.string(),
            bloodGroup: zod_1.z.enum([...faculty_constant_1.BloodGroup]),
            presentAddress: zod_1.z.string(),
            permanentAddress: zod_1.z.string(),
            profileImage: zod_1.z.string(),
            academicDepartment: zod_1.z.string(), // ref id
            isDeleted: zod_1.z.boolean().optional().default(false),
        }),
    }),
});
const updateUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
});
const updateFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string().optional(), // ref id
        designation: zod_1.z.string().optional(),
        name: updateUserNameValidationSchema.partial().optional(),
        gender: zod_1.z.enum([...faculty_constant_1.Gender]).optional(),
        dateOfBirth: zod_1.z
            .string()
            .refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        })
            .optional(),
        email: zod_1.z.string().email().optional(),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.enum([...faculty_constant_1.BloodGroup]).optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        academicDepartment: zod_1.z.string().optional(), // ref id
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.facultyValidations = {
    createFacultyValidationSchema,
    updateFacultyValidationSchema,
};
