import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { facultySearchableFields } from "./faculty.constant";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import AppError from "../../error/appError";
import httpStatus from "http-status";
import { UserModel } from "../user/user.model";
import isFacultyIdExists from "./faculty.utils";

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const FacultyQuery = new QueryBuilder(
    Faculty.find()
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      })
      .populate("user"),
    query
  )
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await FacultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  // isIdExists checking
  await isFacultyIdExists(id);

  const result = await Faculty.findById(id)
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("user");
  return result;
};

const updateSingleFacultyIntoDB = async (
  id: string,
  payload: Partial<TFaculty>
) => {
  // isIdExists checking
  await isFacultyIdExists(id);

  // non-primitive data descruting
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedFacultyData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedFacultyData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(
    id,
    modifiedUpdatedFacultyData,
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};

const deleteSingleFacultyFromDB = async (id: string) => {
  // isIdExists checking
  await isFacultyIdExists(id);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // tansacton - 1
    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Faculty");
    }

    // tansacton - 2
    const userId = deletedFaculty.user;
    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete User");
    }

    await session.commitTransaction(); // delete parmanently to database
    await session.endSession();

    return { deletedFaculty, deletedUser };
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
