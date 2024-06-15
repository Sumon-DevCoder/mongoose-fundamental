"use strict";
// import { z } from "zod";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
// const userValidationSchema = z.object({
//   password: z
//     .string()
//     .min(6, { message: "password must have 6 characters" })
//     .max(20, { message: "password can not be more than 20 character" })
//     .optional(),
//   needsPasswordChange: z.boolean().default(true).optional(),
//   role: z.enum(["admin", "student", "faculty"]),
//   status: z.enum(["in-progress", "blocked"]),
//   isDeleted: z.boolean().default(false).optional(),
// });
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    password: zod_1.z
        .string()
        .min(6, { message: "password must have 6 characters" })
        .max(20, { message: "password can not be more than 20 character" }),
    needsPasswordChange: zod_1.z.boolean(),
    role: zod_1.z.union([
        zod_1.z.literal("admin"),
        zod_1.z.literal("student"),
        zod_1.z.literal("faculty"),
    ]),
    status: zod_1.z.union([zod_1.z.literal("in-progress"), zod_1.z.literal("blocked")]),
    isDeleted: zod_1.z.boolean(),
});
exports.UserValidation = {
    userValidationSchema,
};
