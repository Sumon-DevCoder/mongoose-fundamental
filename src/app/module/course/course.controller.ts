import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { CourseServices } from "./course.service";

// create
const createCourse = catchAsync(async (req, res, next) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course data is created successfully",
    data: result,
  });
});

// get all data
const getAllCourse = catchAsync(async (req, res, next) => {
  console.log("expected query", req.query);
  const result = await CourseServices.getAllCourseFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course data is retrive successfully",
    data: result,
  });
});

// get single data
const getSingleCourse = catchAsync(async (req, res, next) => {
  const result = await CourseServices.getSingleCourseFromDB(
    req.params.courseId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course single data is retrive successfully",
    data: result,
  });
});

// update single data
const updateSingleCourse = catchAsync(async (req, res, next) => {
  const result = await CourseServices.updateSingleCourseIntoDB(
    req.params.courseId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course single data is update successfully",
    data: result,
  });
});

// delete single data
const deleteSingleCourse = catchAsync(async (req, res, next) => {
  const result = await CourseServices.deleteSingleCourseIntoDB(
    req.params.courseId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course single data is update successfully",
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getSingleCourse,
  updateSingleCourse,
  getAllCourse,
  deleteSingleCourse,
};
