import { Schema, model } from "mongoose";
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from "./course.interface";
import AppError from "../../error/appError";
import httpStatus from "http-status";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId, // referencing
    ref: "Course",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: { type: String, unique: true, trim: true, required: true },
  prefix: { type: String, trim: true, required: true },
  code: { type: Number, trim: true, required: true },
  credits: { type: Number, trim: true, required: true },
  isDeleted: { type: Boolean, default: false },
  preRequisiteCourses: [preRequisiteCoursesSchema],
});

// isCourseDataExists (in create time checking)
courseSchema.pre("save", async function (next) {
  const isDataExists = await Course.findOne({ title: this.title });

  if (isDataExists) {
    throw new AppError(httpStatus.CONFLICT, "data is already exists!");
  }
  next();
});

// getAllData without [isDeleted: true] (in read time)
courseSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// getSingleData without [isDeleted: true] (in read time)
courseSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// getAggregateData without [isDeleted: true] (in read time)
courseSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// isCourseDataExists (in get time checking)
courseSchema.pre("find", async function (next) {
  const query = this.getQuery();
  const isDataExists = await Course.findOne(query);

  if (!isDataExists) {
    throw new AppError(httpStatus.NOT_FOUND, "data not found!😒");
  }
  next();
});

export const Course = model<TCourse>("Course", courseSchema);

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId, // referencing
    ref: "Course",
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId, // referencing
      ref: "faculty",
    },
  ],
});

export const CourseFaculty = model<TCourseFaculty>(
  "CourseFaculty",
  courseFacultySchema
);
