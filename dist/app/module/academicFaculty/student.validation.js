"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidations = void 0;
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
    fatherName: zod_1.z.string().trim().min(1),
    fatherOccupation: zod_1.z.string().min(1),
    fatherContactNo: zod_1.z.string().min(1),
    motherName: zod_1.z.string().min(1),
    motherOccupation: zod_1.z.string().min(1),
    motherContactNo: zod_1.z.string().min(1),
});
// LocalGuardian Zod Schema
const localGuardianVaildationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    occupation: zod_1.z.string().min(1),
    contactNo: zod_1.z.string().min(1),
    address: zod_1.z.string().min(1),
});
// create Student Zod Schema
const createStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        student: zod_1.z.object({
            password: zod_1.z.string().max(20).optional(),
            name: userNameValidationSchema,
            gender: zod_1.z.enum(["male", "female", "other"], {
                errorMap: () => ({
                    message: "The gender field can only be one of the following values: male, female, other",
                }),
            }),
            dateOfBirth: zod_1.z.string(),
            email: zod_1.z.string().min(1).email({ message: "Email is not a valid email" }),
            contactNumber: zod_1.z.string().min(1),
            bloodGroup: zod_1.z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
            presentAddress: zod_1.z.string().min(1),
            permanentAddress: zod_1.z.string().min(1),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianVaildationSchema,
            profileImg: zod_1.z.string(),
            isDeleted: zod_1.z.boolean().default(false),
            admissionSemester: zod_1.z.string(), // ObjectId reference to an AcademicSemester document
            academicDepartment: zod_1.z.string(), // ObjectId reference to an academicDepartment document
        }),
    }),
});
// update Student Zod Schema
const UpdateStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20).optional(),
        name: userNameValidationSchema,
        gender: zod_1.z
            .enum(["male", "female", "other"], {
            errorMap: () => ({
                message: "The gender field can only be one of the following values: male, female, other",
            }),
        })
            .optional(),
        dateOfBirth: zod_1.z.string().optional(),
        email: zod_1.z
            .string()
            .min(1)
            .email({ message: "Email is not a valid email" })
            .optional(),
        contactNumber: zod_1.z.string().min(1).optional(),
        bloodGroup: zod_1.z
            .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
            .optional(),
        presentAddress: zod_1.z.string().min(1).optional(),
        permanentAddress: zod_1.z.string().min(1).optional(),
        guardian: guardianValidationSchema.optional(),
        localGuardian: localGuardianVaildationSchema.optional(),
        profileImg: zod_1.z.string().optional(),
        admissionSemester: zod_1.z.string().optional(), // ObjectId reference to an AcademicSemester document
        academicDepartment: zod_1.z.string().optional(), // ObjectId reference to an academicDepartment document
        isDeleted: zod_1.z.string().optional(),
    }),
});
exports.studentValidations = {
    createStudentValidationSchema,
    UpdateStudentValidationSchema,
};
