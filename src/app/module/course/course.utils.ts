import httpStatus from "http-status";
import AppError from "../../error/appError";
import { Course } from "./course.model";

const courseIdIsExists = async (id: string) => {
  const isDataExists = await Course.findById(id);

  if (!isDataExists) {
    throw new AppError(httpStatus.NOT_FOUND, "data not found!");
  }
};

export default courseIdIsExists;
