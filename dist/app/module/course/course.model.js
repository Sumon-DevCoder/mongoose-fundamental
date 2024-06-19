"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const preRequisiteCoursesSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId, // referencing
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
exports.Course = (0, mongoose_1.model)("Course", courseSchema);
