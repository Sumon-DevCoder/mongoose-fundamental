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
  const result = await CourseServices.getAllCourseFromDB(req.query);

  console.log("result controler", result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course data is retrive successfully",
    data: result,
  });
});

// get single data
const getSingleCourse = catchAsync(async (req, res, next) => {
  const result = await CourseServices.getSingleCourseFromDB(req.params.id);

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
    req.params.id,
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
  const result = await CourseServices.deleteSingleCourseIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course single data is update successfully",
    data: result,
  });
});

// assign-faculties
const assignFacultiesWithCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.assignFacultiesWithCoursIntroDB(
    courseId,
    faculties
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "assign course faulty data is update successfully",
    data: result,
  });
});

// remove-faculties
const removeFacultiesWithCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.removeFacultiesWithCoursIntroDB(
    courseId,
    faculties
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "remove courseFaculty data is update successfully",
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getSingleCourse,
  updateSingleCourse,
  getAllCourse,
  deleteSingleCourse,
  assignFacultiesWithCourse,
  removeFacultiesWithCourse,
};
