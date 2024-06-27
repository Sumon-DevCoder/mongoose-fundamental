"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_constant_1 = require("./course.constant");
const course_model_1 = require("./course.model");
const course_utils_1 = __importDefault(require("./course.utils"));
const createCourseIntoDB = async (payload) => {
    const result = await course_model_1.Course.create(payload);
    return result;
};
const getAllCourseFromDB = async (query) => {
    const courseQuery = new QueryBuilder_1.default(course_model_1.Course.find().populate("preRequisiteCourses.course"), query)
        .search(course_constant_1.courseSearchableField)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await courseQuery.modelQuery;
    return result;
};
const getSingleCourseFromDB = async (id) => {
    const result = await course_model_1.Course.findById(id);
    return result;
};
const updateSingleCourseIntoDB = async (id, payload) => {
    //  divide field by destructing
    const { preRequisiteCourses } = payload, remainingCourseData = __rest(payload, ["preRequisiteCourses"]);
    console.log("preRequisiteCourses", preRequisiteCourses);
    console.log("remainingCourseData", remainingCourseData);
    // idIsExist check
    (0, course_utils_1.default)(id);
    // step-1: basic course info update
    const updatedBasicCourseInfo = await course_model_1.Course.findByIdAndUpdate(id, remainingCourseData, {
        new: true,
        runValidators: true,
    });
    // step-2: check if there any prerequisted courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
        // filter out the deleted fields
        const deletedPreRequisites = preRequisiteCourses
            .filter((el) => el.course && el.isDeleted)
            .map((el) => el.course);
        console.log("deletedPreRequisites", deletedPreRequisites);
        const deletedPreRequisitesCourse = await course_model_1.Course.findByIdAndUpdate(id, {
            $pull: {
                preRequisiteCourses: { courses: { $in: deletedPreRequisites } },
            },
        });
    }
    return updatedBasicCourseInfo;
};
const deleteSingleCourseIntoDB = async (id) => {
    const result = await course_model_1.Course.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    return result;
};
exports.CourseServices = {
    createCourseIntoDB,
    getSingleCourseFromDB,
    updateSingleCourseIntoDB,
    getAllCourseFromDB,
    deleteSingleCourseIntoDB,
};
