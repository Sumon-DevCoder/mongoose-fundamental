import httpStatus from "http-status";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { academicSemesterModel } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interfaces";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";
import mongoose from "mongoose";
import AppError from "../../error/appError";

const createStudentDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password not given use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";

  // find academic semester info
  const admissionSemester = await academicSemesterModel.findById(
    payload.admissionSemester
  );

  if (!admissionSemester) {
    throw new AppError(404, "admission semester not found");
  }

  // set mannually generate id
  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);

  // Transaction Initialization
  const session = await mongoose.startSession();

  try {
    // Transaction Handling
    session.startTransaction();

    // create a user (transction - 1)
    const newUser = await UserModel.create([userData], { session });

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    } else {
      payload.id = newUser[0].id; // embedded id
      payload.user = newUser[0]._id; // reference ids
    }

    // create a student (transction - 2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction(); // if student and user create successfully commits transaction to save database permanently
    await session.endSession(); // Ends the database session.

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction(); // If any error occurs during the process, aborts the transaction and ends the session.
    await session.endSession(); // ends the session.
    throw new AppError(400, "student and user not created"); // throws the error.
  }
};

const deleteUserFromDB = async (id: string) => {
  const result = await UserModel.updateOne({ id }, { isDeleted: true });
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUsersFromDB = async (id: string) => {
  // const result = await UserModel.findOne({ id });
  const result = await UserModel.aggregate([{ $match: { id: id } }]);

  return result;
};

export const UserServices = {
  createStudentDB,
  deleteUserFromDB,
  getAllUsersFromDB,
  getSingleUsersFromDB,
};
