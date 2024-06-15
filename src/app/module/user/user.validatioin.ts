import { z } from "zod";

const userValidationSchema = z.object({
  password: z
    .string()
    .min(6, { message: "password must have 6 characters" })
    .max(20, { message: "password can not be more than 20 character" }),
  needsPasswordChange: z.boolean(),
  role: z.union([
    z.literal("admin"),
    z.literal("student"),
    z.literal("faculty"),
  ]),
  status: z.union([z.literal("in-progress"), z.literal("blocked")]),
  isDeleted: z.boolean(),
});

export const UserValidations = {
  userValidationSchema,
};
