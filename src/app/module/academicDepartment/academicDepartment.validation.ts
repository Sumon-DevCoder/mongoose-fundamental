import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic Department must be string",
        required_error: "department is required",
      })
      .min(1, " Academic Department name is required"),
    academicFaculty: z.string({
      // ObjectId reference to an AcademicFaculty document
      invalid_type_error: "Academic faculty must be string",
      required_error: "faculty is required",
    }),
  }),
});

// update Student Zod Schema
const UpdateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic Department must be string",
        required_error: "department is required",
      })
      .min(1, " Academic Department name is required")
      .optional(),
    academicFaculty: z
      .string({
        // ObjectId reference to an AcademicFaculty document
        invalid_type_error: "Academic faculty must be string",
        required_error: "faculty is required",
      })
      .optional(),
  }),
});

export const academicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  UpdateAcademicDepartmentValidationSchema,
};
