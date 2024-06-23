"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = void 0;
const course_model_1 = require("./course.model");
const createCourseIntoDB = async (payload) => {
    const result = await course_model_1.Course.create(payload);
    return result;
};
// const getAllCourseFromDB = async (query: Record<string, unknown>) => {
//   console.log("get query services ", query);
//   const courseQuery = new QueryBuilder(Course.find(), query)
//     .search(courseSearchableField)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();
//   const result = await courseQuery.modelQuery;
//   return result;
// };
const getAllCourseFromDB = async (query) => {
    const result = await course_model_1.Course.find();
    return result;
};
const getSingleCourseFromDB = async (id) => {
    const result = await course_model_1.Course.findById(id);
    return result;
};
const updateSingleCourseIntoDB = async (id, payload) => {
    const result = await course_model_1.Course.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
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
