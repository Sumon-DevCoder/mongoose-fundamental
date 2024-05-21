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
  fatherName: z.string().trim().nonempty("Father name is required"),
  fatherOccupation: z.string().nonempty("Father occupation is required"),
  fatherContactNo: z.string().nonempty("Father contact number is required"),
  motherName: z.string().nonempty("Mother name is required"),
  motherOccupation: z.string().nonempty("Mother occupation is required"),
  motherContactNo: z.string().nonempty("Mother contact number is required"),
});

// LocalGuardian Zod Schema
const localGuardianVaildationSchema = z.object({
  name: z.string().nonempty("Local guardian name is required"),
  occupation: z.string().nonempty("Local guardian occupation is required"),
  contactNo: z.string().nonempty("Local guardian contact number is required"),
  address: z.string().nonempty("Local guardian address is required"),
});

// Student Zod Schema
const studentValidationSchema = z.object({
  id: z.string().nonempty("ID is required"),
  name: userNameValidationSchema,
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({
      message:
        "The gender field can only be one of the following values: male, female, other",
    }),
  }),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .email({ message: "Email is not a valid email" })
    .nonempty("Email is required"),
  contactNumber: z.string().nonempty("Contact number is required"),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z.string().nonempty("Present address is required"),
  permanentAddress: z.string().nonempty("Permanent address is required"),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianVaildationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(["active", "inActive"]).default("active"),
});

export default studentValidationSchema;
