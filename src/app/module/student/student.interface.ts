import { Model, Types } from "mongoose";

export type Gurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type LocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  // step 1
  user: Types.ObjectId; // ObjectId reference to a User document
  admissionSemester: Types.ObjectId; // ObjectId reference to an AcademicSemester document
  academicDepartment: Types.ObjectId; // ObjectId reference to an AcademicDepartment document
  name: UserName;
  gender: "Male" | "Female" | "Other";
  dateOfBirth?: Date;
  email: string;
  contactNumber: string;
  emergencyContactNum: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: Gurdian;
  localGuardian: LocalGurdian;
  profileImg?: string;
  isDeleted: boolean;
  isActive: "active" | "blocked";
};

// custom instance method > just check isUserExists
// export type StudentMethods = {
//   isUserExist(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;

// custom static method > just check isUserEXists
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
