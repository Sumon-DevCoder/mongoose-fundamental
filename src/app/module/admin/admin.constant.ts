import { TBloodGroup, TGender } from "./admin.interface";

export const Gender: TGender[] = ["Male", "Female", "Other"];
export const BloodGroup: TBloodGroup[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const adminSearchableFields = [
  "email",
  "id",
  "contactNo",
  "emergencyContactNo",
  "name.firstName",
  "name.lastName",
  "name.middleName",
];
