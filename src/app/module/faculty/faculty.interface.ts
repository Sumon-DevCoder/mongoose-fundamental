import { Types } from "mongoose";

type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export type TGender = "Male" | "Female" | "Other";

export type TFaculty = {
  id: string;
  user: Types.ObjectId; // ref
  designation: string;
  name: TUserName;
  gender: TGender;
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  academicDepartment: Types.ObjectId; // ref
  isDeleted: boolean;
};
