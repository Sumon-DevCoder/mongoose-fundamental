import Joi from "joi";

const userNameSchema = Joi.object({
  fistName: Joi.string()
    .max(20)
    .trim()
    .required()
    .regex(/^[A-Z][a-zA-Z]*$/)
    .messages({
      "string.pattern.base": "{#label} is not capitalize format",
      "any.required": "First name is required",
      "string.max": "First name should have a maximum length of {#limit}",
    }),
  middleName: Joi.string().max(20).allow(""),
  lastName: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!/^[A-Za-z]+$/.test(value)) {
        return helpers.message({ "any.custom": "{#label} is not valid" });
      }
      return value;
    })
    .messages({
      "any.required": "Last name is required",
    }),
});

// Define Guardian validation schema
const guardianSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    "any.required": "Father name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    "any.required": "Father occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    "any.required": "Father contact number is required",
  }),
  mohterName: Joi.string().required().messages({
    "any.required": "Mother name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    "any.required": "Mother occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    "any.required": "Mother contact number is required",
  }),
});

// Define LocalGuardian validation schema
const localGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Local guardian name is required",
  }),
  occupation: Joi.string().required().messages({
    "any.required": "Local guardian occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    "any.required": "Local guardian contact number is required",
  }),
  address: Joi.string().required().messages({
    "any.required": "Local guardian address is required",
  }),
});

// Define Student validation schema
const studentSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ID is required",
  }),
  name: userNameSchema.required().messages({
    "any.required": "Name is required",
  }),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only":
      "The gender field can only be one of the following values: male, female, other",
    "any.required": "Gender is required",
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    "string.email": "{#label} is not a valid email",
    "any.required": "Email is required",
  }),
  contactNumber: Joi.string().required().messages({
    "any.required": "Contact number is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .optional()
    .messages({
      "any.only": "Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-",
    }),
  presentAddress: Joi.string().required().messages({
    "any.required": "Present address is required",
  }),
  parmanentAddress: Joi.string().required().messages({
    "any.required": "Permanent address is required",
  }),
  guardian: guardianSchema.required().messages({
    "any.required": "Guardian information is required",
  }),
  localGurdian: localGuardianSchema.required().messages({
    "any.required": "Local guardian information is required",
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string()
    .valid("active", "inActive")
    .default("active")
    .messages({
      "any.only": "Status must be either active or inActive",
    }),
});

export default studentSchema;
