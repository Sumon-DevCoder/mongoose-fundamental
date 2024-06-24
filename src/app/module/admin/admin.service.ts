import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { adminSearchableFields } from "./admin.constant";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import AppError from "../../error/appError";
import { UserModel } from "../user/user.model";
import { isAdminSingleIdExists } from "./admin.utils";

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find().populate("user"), query)
    .search(adminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleAdminFromDB = async (
  id: string
  // query: Record<string, unknown>
) => {
  await isAdminSingleIdExists(id);

  const result = await Admin.findById(id).populate("user");
  return result;
};

const updateSingleAdminIntoDB = async (
  id: string,
  payload: Partial<TAdmin>
) => {
  // desctucring non-primitive data from payload
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  // isIdExists
  await isAdminSingleIdExists(id);

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSingleAdminFromDB = async (id: string) => {
  // isIdExists
  await isAdminSingleIdExists(id);

  // start session
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // transaction - 1
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedAdmin) {
      throw new AppError(400, "Failed to deleted admin");
    }

    // transaction - 2
    const userId = deletedAdmin.user;
    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(400, "Failed to deleted user");
    }

    await session.commitTransaction(); // delete parmanently to database
    await session.endSession();

    return {
      deletedAdmin,
      deletedUser,
    };
  } catch (err: any) {
    session.abortTransaction();
    session.endSession();
    throw new Error(err);
  }
};

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateSingleAdminIntoDB,
  deleteSingleAdminFromDB,
};
