export type Gurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  mohterName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type UserName = {
  fistName: string;
  middleName: string;
  lastName: string;
};

export type LocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: string;
  dateOfBirth?: string;
  email: string;
  contactNumber: string;
  emergencyContactNum: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  parmanentAddress: string;
  guardian: Gurdian;
  localGurdian: LocalGurdian;
  profileImg?: string;
  isActive: "active" | "inActive";
};
