import { Student } from "./student.interface";
import { StudentModel } from "./student.model";

const createStudentDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getStudentSingleValue = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentDB,
  getAllStudentFromDB,
  getStudentSingleValue,
};
