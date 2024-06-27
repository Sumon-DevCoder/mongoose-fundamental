"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const appError_1 = __importDefault(require("../../error/appError"));
const http_status_1 = __importDefault(require("http-status"));
const preRequisiteCoursesSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId, // referencing
        ref: "Course",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
const courseSchema = new mongoose_1.Schema({
    title: { type: String, unique: true, trim: true, required: true },
    prefix: { type: String, trim: true, required: true },
    code: { type: Number, trim: true, required: true },
    credits: { type: Number, trim: true, required: true },
    isDeleted: { type: Boolean, default: false },
    preRequisiteCourses: [preRequisiteCoursesSchema],
});
// isCourseDataExists (in create time checking)
courseSchema.pre("save", async function (next) {
    const isDataExists = await exports.Course.findOne({ title: this.title });
    if (isDataExists) {
        throw new appError_1.default(http_status_1.default.CONFLICT, "data is already exists!");
    }
    next();
});
// getAllData without [isDeleted: true] (in read time)
// courseSchema.pre("find", function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });
// getSingleData without [isDeleted: true] (in read time)
// courseSchema.pre("findOne", function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });
// getAggregateData without [isDeleted: true] (in read time)
courseSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
// isCourseDataExists (in get time checking)
courseSchema.pre("find", async function (next) {
    const query = this.getQuery();
    console.log("query mama", query);
    const isDataExists = await exports.Course.findOne(query);
    console.log("isDataExists mama", isDataExists);
    if (!isDataExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "data not found!");
    }
    next();
});
exports.Course = (0, mongoose_1.model)("Course", courseSchema);
