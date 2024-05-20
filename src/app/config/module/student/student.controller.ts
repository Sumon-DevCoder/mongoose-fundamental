import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    console.log(studentData);
    const result = await StudentServices.createStudentDB(studentData);

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();

    res.status(200).json({
      success: true,
      message: "Student data is retrive successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getStudentSingleItem = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getStudentSingleValue(studentId);

    res.status(200).json({
      success: true,
      message: "Student single data is retrive successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getStudentSingleItem,
};
