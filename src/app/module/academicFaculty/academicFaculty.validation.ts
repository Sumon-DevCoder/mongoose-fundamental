import { z } from "zod";

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic Faculty must be string",
      })
      .min(1, " Academic Faculty name is required"),
  }),
});

// update Student Zod Schema
const UpdateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "name is required"),
  }),
});

export const academicFacultyValidations = {
  createAcademicFacultyValidationSchema,
  UpdateAcademicFacultyValidationSchema,
};
