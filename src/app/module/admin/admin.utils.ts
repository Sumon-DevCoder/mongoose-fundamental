import httpStatus from "http-status";
import AppError from "../../error/appError";
import { Admin } from "./admin.model";

export const isAdminSingleIdExists = async (id: string) => {
  const isDataExists = await Admin.findById(id);

  if (!isDataExists) {
    throw new AppError(httpStatus.NOT_FOUND, "data not exists");
  }
};
