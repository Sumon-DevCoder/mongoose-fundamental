"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidations = exports.updateAdminValidationSchema = exports.updateUserNameValidationSchema = exports.createAdminValidationSchema = exports.createUserNameValidationSchema = void 0;
const zod_1 = require("zod");
const admin_constant_1 = require("./admin.constant");
exports.createUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string({
        required_error: "firstName is required",
    })
        .min(3)
        .max(20),
    middleName: zod_1.z
        .string({
        required_error: "middleName is required",
    })
        .min(3)
        .max(20)
        .optional(),
    lastName: zod_1.z
        .string({
        required_error: "lastName is required",
    })
        .min(3)
        .max(20),
});
exports.createAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        admin: zod_1.z.object({
            designation: zod_1.z.string(),
            name: exports.createUserNameValidationSchema,
            gender: zod_1.z.enum([...admin_constant_1.Gender]),
            dateOfBirth: zod_1.z
                .string({ required_error: "Date of birth is required" })
                .date()
                .optional(),
            email: zod_1.z.string().email("Invalid email"),
            bloogGroup: zod_1.z.enum([...admin_constant_1.BloodGroup]).optional(),
            contactNo: zod_1.z.string(),
            emergencyContactNo: zod_1.z.string(),
            presentAddress: zod_1.z.string(),
            permanentAddress: zod_1.z.string(),
            profileImage: zod_1.z.string(),
            isDeleted: zod_1.z.boolean().optional().default(false),
        }),
    }),
});
exports.updateUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string({
        required_error: "firstName is required",
    })
        .min(3)
        .max(20)
        .optional(), // Allow firstName to be optional for updates
    middleName: zod_1.z
        .string({
        required_error: "middleName is required",
    })
        .min(3)
        .max(20)
        .optional(), // Allow middleName to be optional for updates
    lastName: zod_1.z
        .string({
        required_error: "lastName is required",
    })
        .min(3)
        .max(20)
        .optional(), // Allow lastName to be optional for updates
});
exports.updateAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        admin: zod_1.z.object({
            designation: zod_1.z.string().optional(), // Allow designation to be optional for updates
            name: exports.updateUserNameValidationSchema.optional(), // Allow name to be optional for updates
            gender: zod_1.z.enum([...admin_constant_1.Gender]).optional(), // Allow gender to be optional for updates
            dateOfBirth: zod_1.z
                .date({ required_error: "Date of birth is required" })
                .optional(), // Allow dateOfBirth to be optional for updates
            email: zod_1.z.string().email("Invalid email").optional(), // Allow email to be optional for updates
            bloogGroup: zod_1.z.enum([...admin_constant_1.BloodGroup]).optional(), // Allow bloogGroup to be optional for updates
            contactNo: zod_1.z.string().optional(), // Allow contactNo to be optional for updates
            emergencyContactNo: zod_1.z.string().optional(), // Allow emergencyContactNo to be optional for updates
            presentAddress: zod_1.z.string().optional(), // Allow presentAddress to be optional for updates
            permanentAddress: zod_1.z.string().optional(), // Allow permanentAddress to be optional for updates
            profileImage: zod_1.z.string().optional(), // Allow profileImage to be optional for updates
            isDeleted: zod_1.z.boolean().optional().default(false), // Allow isDeleted to be optional for updates
        }),
    }),
});
exports.AdminValidations = {
    createAdminValidationSchema: exports.createAdminValidationSchema,
    updateAdminValidationSchema: exports.updateAdminValidationSchema,
};
