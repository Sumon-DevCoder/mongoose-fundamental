import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentSchema from "./student.validation_joi";
import studentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // creating schema a validation using Joi
    // const { error, value } = studentSchema.validate(studentData);

    // creating schema a validation using Joi
    const zodParseData = studentValidationSchema.parse(studentData);
    const result = await StudentServices.createStudentDB(zodParseData);

    if (error) {
      res.status(500).json({
        success: false,
        message: "kisu vul ase something went wrong",
        error: error.details,
      });
    }

    // console.log("my error", error, "my value", value);

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: err,
    });
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
