import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

// create student
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is created successfully",
    data: result,
  });
});

// create admin
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created successfully",
    data: result,
  });
});

// create faculty
const createFaculty = catchAsync(async (req, res, next) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(
    password,
    facultyData,
    next
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is created successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await UserServices.deleteUserFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete User is successfully",
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Data fetch successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUsersFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Data fetch successfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createAdmin,
  deleteUser,
  getAllUser,
  getSingleUser,
  createFaculty,
};
