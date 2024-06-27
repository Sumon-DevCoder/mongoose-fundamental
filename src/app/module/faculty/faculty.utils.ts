import httpStatus from "http-status";
import AppError from "../../error/appError";
import { Faculty } from "./faculty.model";

const isFacultyIdExists = async (id: string) => {
  const isIdExists = await Faculty.findById(id);

  if (!isIdExists) {
    throw new AppError(httpStatus.NOT_FOUND, "data not found");
  }
};

export default isFacultyIdExists;
