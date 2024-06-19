import { z } from "zod";
import { Gender, BloodGroup } from "./faculty.constant";

const createUserNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const createFacultyValidationSchema = z.object({
  user: z.string(), // ref id
  designation: z.string(),
  name: createUserNameValidationSchema,
  gender: z.enum([...Gender] as [string, ...string[]]),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  profileImage: z.string(),
  academicDepartment: z.string(), // ref id
  isDeleted: z.boolean().optional().default(false),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateFacultyValidationSchema = z.object({
  user: z.string().optional(), // ref id
  designation: z.string().optional(),
  name: updateUserNameValidationSchema.partial().optional(),
  gender: z.enum([...Gender] as [string, ...string[]]).optional(),
  dateOfBirth: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .optional(),
  email: z.string().email().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  profileImage: z.string().optional(),
  academicDepartment: z.string().optional(), // ref id
  isDeleted: z.boolean().optional(),
});

export const facultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
