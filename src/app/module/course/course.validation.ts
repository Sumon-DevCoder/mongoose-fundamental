import { z } from "zod";

const preRequisiteCoursesValidationSchema = z.object({
  course: z.string().min(1),
  isDeleted: z.boolean().default(false),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1),
    prefix: z.string().trim().min(1),
    code: z.number().int(),
    credits: z.number().int(),
    isDeleted: z.boolean().default(false),
    preRequisiteCourses: z.array(preRequisiteCoursesValidationSchema),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1).optional(),
    prefix: z.string().trim().min(1).optional(),
    code: z.number().int().optional(),
    credits: z.number().int().optional(),
    isDeleted: z.boolean().default(false).optional(),
    preRequisiteCourses: z
      .array(preRequisiteCoursesValidationSchema)
      .optional(),
  }),
});

const courseFacultyValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  courseFacultyValidationSchema,
};
