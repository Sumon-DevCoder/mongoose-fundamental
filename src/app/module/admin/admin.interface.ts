export type TUserName = {
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

export type TAdmin = {
  user: import("mongoose").Types.ObjectId;
  id: string;
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
  isDeleted: boolean;
};
