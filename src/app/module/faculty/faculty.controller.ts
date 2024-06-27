import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { FacultyServices } from "./faculty.service";

// get all data
const getAllFaculties = catchAsync(async (req, res, next) => {
  const result = await FacultyServices.getAllFacultyFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties data is retrive successfully",
    data: result,
  });
});

// get single data
const getSingleFacultry = catchAsync(async (req, res, next) => {
  const result = await FacultyServices.getSingleFacultyFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty single data is retrive successfully",
    data: result,
  });
});

// update single data
const updateSingleFacultry = catchAsync(async (req, res, next) => {
  const result = await FacultyServices.updateSingleFacultyIntoDB(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty single data is update successfully",
    data: result,
  });
});

const deleteSingleFaculty = catchAsync(async (req, res, next) => {
  const result = await FacultyServices.deleteSingleFacultyFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty single data is delete successfully",
    data: result,
  });
});

export const FacultryControllers = {
  deleteSingleFaculty,
  getAllFaculties,
  getSingleFacultry,
  updateSingleFacultry,
};
