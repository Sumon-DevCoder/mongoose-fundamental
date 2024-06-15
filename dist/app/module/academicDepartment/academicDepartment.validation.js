"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentValidations = void 0;
const zod_1 = require("zod");
const createAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: "Academic Department must be string",
            required_error: "department is required",
        })
            .min(1, " Academic Department name is required"),
        academicFaculty: zod_1.z.string({
            // ObjectId reference to an AcademicFaculty document
            invalid_type_error: "Academic faculty must be string",
            required_error: "faculty is required",
        }),
    }),
});
// update Student Zod Schema
const UpdateAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: "Academic Department must be string",
            required_error: "department is required",
        })
            .min(1, " Academic Department name is required")
            .optional(),
        academicFaculty: zod_1.z
            .string({
            // ObjectId reference to an AcademicFaculty document
            invalid_type_error: "Academic faculty must be string",
            required_error: "faculty is required",
        })
            .optional(),
    }),
});
exports.academicDepartmentValidations = {
    createAcademicDepartmentValidationSchema,
    UpdateAcademicDepartmentValidationSchema,
};
