"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidations = void 0;
const zod_1 = require("zod");
const preRequisiteCoursesValidationSchema = zod_1.z.object({
    course: zod_1.z.string().min(1),
    isDeleted: zod_1.z.boolean().default(false),
});
const createCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().trim().min(1),
        prefix: zod_1.z.string().trim().min(1),
        code: zod_1.z.number().int(),
        credits: zod_1.z.number().int(),
        isDeleted: zod_1.z.boolean().default(false),
        preRequisiteCourses: zod_1.z
            .array(preRequisiteCoursesValidationSchema)
            .optional(),
    }),
});
const updateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().trim().min(1).optional(),
        prefix: zod_1.z.string().trim().min(1).optional(),
        code: zod_1.z.number().int().optional(),
        credits: zod_1.z.number().int().optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
        preRequisiteCourses: preRequisiteCoursesValidationSchema.optional(),
    }),
});
exports.courseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
};
