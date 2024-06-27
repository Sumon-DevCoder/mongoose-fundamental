import { Schema, model } from "mongoose";
import { TUserName } from "../admin/admin.interface";
import { TFaculty } from "./faculty.interface";
import { BloodGroup, Gender } from "./faculty.constant";
import AppError from "../../error/appError";
import httpStatus from "http-status";

const UserNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const FacultySchema = new Schema<TFaculty>(
  {
    id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    designation: { type: String, required: true },
    name: { type: UserNameSchema, required: true },
    gender: { type: String, enum: { values: Gender }, required: true },
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: { values: BloodGroup },
      required: true,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: { type: String, required: true },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment", // ref
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// 🤷‍♂️ virtual field create
FacultySchema.virtual("fullName").get(function () {
  return (
    this?.name?.firstName +
    " " +
    this?.name?.middleName +
    " " +
    this?.name?.lastName +
    " "
  );
});

// 🤷‍♂️ isFacultyDataExists -- in create time checking
FacultySchema.pre("save", async function (next) {
  const isFacultyExists = await Faculty.findOne({
    email: this.email,
  });

  if (isFacultyExists) {
    throw new AppError(httpStatus.CONFLICT, `data is already exists!`);
  }
  next();
});

// 🤷‍♂️ getAllData without [isDeleted: true] -- in read time checking
FacultySchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// 🤷‍♂️ getSingleData without [isDeleted: true] -- in read time checking
FacultySchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// 🤷‍♂️ getAggregateData without [isDeleted: true] -- in read time checking
FacultySchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// 🤷‍♂️ isFacultyDataExists -- in get time checking
FacultySchema.pre("find", async function (next) {
  const query = this.getQuery();

  const isFacultyDataExists = await Faculty.findOne(query);

  if (!isFacultyDataExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Data not found!");
  }

  next();
});

export const Faculty = model<TFaculty>("Faculty", FacultySchema);
