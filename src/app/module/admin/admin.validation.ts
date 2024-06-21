import { z } from "zod";
import { BloodGroup, Gender } from "./admin.constant";

export const createUserNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: "firstName is required",
    })
    .min(3)
    .max(20),
  middleName: z
    .string({
      required_error: "middleName is required",
    })
    .min(3)
    .max(20)
    .optional(),
  lastName: z
    .string({
      required_error: "lastName is required",
    })
    .min(3)
    .max(20),
});

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    admin: z.object({
      designation: z.string(),
      name: createUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z
        .string({ required_error: "Date of birth is required" })
        .date()
        .optional(),
      email: z.string().email("Invalid email"),
      bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImage: z.string(),
      isDeleted: z.boolean().optional().default(false),
    }),
  }),
});

export const updateUserNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: "firstName is required",
    })
    .min(3)
    .max(20)
    .optional(), // Allow firstName to be optional for updates
  middleName: z
    .string({
      required_error: "middleName is required",
    })
    .min(3)
    .max(20)
    .optional(), // Allow middleName to be optional for updates
  lastName: z
    .string({
      required_error: "lastName is required",
    })
    .min(3)
    .max(20)
    .optional(), // Allow lastName to be optional for updates
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      designation: z.string().optional(), // Allow designation to be optional for updates
      name: updateUserNameValidationSchema.optional(), // Allow name to be optional for updates
      gender: z.enum([...Gender] as [string, ...string[]]).optional(), // Allow gender to be optional for updates
      dateOfBirth: z
        .date({ required_error: "Date of birth is required" })
        .optional(), // Allow dateOfBirth to be optional for updates
      email: z.string().email("Invalid email").optional(), // Allow email to be optional for updates
      bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(), // Allow bloogGroup to be optional for updates
      contactNo: z.string().optional(), // Allow contactNo to be optional for updates
      emergencyContactNo: z.string().optional(), // Allow emergencyContactNo to be optional for updates
      presentAddress: z.string().optional(), // Allow presentAddress to be optional for updates
      permanentAddress: z.string().optional(), // Allow permanentAddress to be optional for updates
      profileImage: z.string().optional(), // Allow profileImage to be optional for updates
      isDeleted: z.boolean().optional().default(false), // Allow isDeleted to be optional for updates
    }),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
