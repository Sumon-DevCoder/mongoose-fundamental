import { z } from "zod";

// UserName Zod Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: "First name should have a maximum length of 20" })
    .refine((value) => /^[A-Z][a-zA-Z]*$/.test(value), {
      message: "First name is not in capitalize format",
    }),
  middleName: z
    .string()
    .max(20, { message: "Middle name should have a maximum length of 20" })
    .optional(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: "Last name is not valid",
  }),
});

// Guardian Zod Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

// LocalGuardian Zod Schema
const localGuardianVaildationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

// create Student Zod Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      password: z.string().max(20).optional(),
      name: userNameValidationSchema,
      gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({
          message:
            "The gender field can only be one of the following values: male, female, other",
        }),
      }),
      dateOfBirth: z.string(),
      email: z.string().min(1).email({ message: "Email is not a valid email" }),
      contactNumber: z.string().min(1),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianVaildationSchema,
      profileImg: z.string(),
      isDeleted: z.boolean().default(false),
      admissionSemester: z.string(), // ObjectId reference to an AcademicSemester document
      academicDepartment: z.string(), // ObjectId reference to an academicDepartment document
    }),
  }),
});

// update Student Zod Schema
const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    name: userNameValidationSchema.optional(),
    gender: z
      .enum(["male", "female", "other"], {
        errorMap: () => ({
          message:
            "The gender field can only be one of the following values: male, female, other",
        }),
      })
      .optional(),
    dateOfBirth: z.string().optional(),
    email: z
      .string()
      .min(1)
      .email({ message: "Email is not a valid email" })

      .optional(),
    contactNumber: z.string().min(1).optional(),
    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
      .optional(),
    presentAddress: z.string().min(1).optional(),
    permanentAddress: z.string().min(1).optional(),
    guardian: guardianValidationSchema.optional(),
    localGuardian: localGuardianVaildationSchema.optional(),
    profileImg: z.string().optional(),
    admissionSemester: z.string().optional(), // ObjectId reference to an AcademicSemester document
    academicDepartment: z.string().optional(), // ObjectId reference to an academicDepartment document
    isDeleted: z.string().optional(),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
