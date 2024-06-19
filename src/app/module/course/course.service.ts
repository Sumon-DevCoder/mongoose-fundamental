import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableField } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

// const getAllCourseFromDB = async (query: Record<string, unknown>) => {
//   console.log("get query services ", query);
//   const courseQuery = new QueryBuilder(Course.find(), query)
//     .search(courseSearchableField)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await courseQuery.modelQuery;
//   return result;
// };

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const result = await Course.find();
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const updateSingleCourseIntoDB = async (
  id: string,
  payload: Partial<TCourse>
) => {
  const result = await Course.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteSingleCourseIntoDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );

  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getSingleCourseFromDB,
  updateSingleCourseIntoDB,
  getAllCourseFromDB,
  deleteSingleCourseIntoDB,
};
