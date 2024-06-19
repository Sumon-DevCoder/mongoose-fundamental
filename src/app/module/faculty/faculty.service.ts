import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { facultySearchableFields } from "./faculty.constant";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import AppError from "../../error/appError";
import httpStatus from "http-status";
import { UserModel } from "../user/user.model";

// const getAllAdminFromDB = async () => {
//   const result = await Admin.find();
//   return result;
// };

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const FacultyQuery = new QueryBuilder(Faculty.find(), query)
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await FacultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id);
  return result;
};

const updateSingleFacultyIntoDB = async (
  id: string,
  payload: Partial<TFaculty>
) => {
  const result = await Faculty.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteSingleFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // tansacton - 1
    const deletedFaculty = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Faculty");
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete User");
    }

    await session.commitTransaction(); // delete parmanently to database
    await session.endSession();

    return deletedUser;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateSingleFacultyIntoDB,
  deleteSingleFacultyFromDB,
};
