import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { TAdmin } from "../admin/admin.interface";
import { UserModel } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  // 200501  0001
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString(); // by default "0"

  // 2030 01 0001
  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6); // 0001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

// admin id generate

export const generateAdminId = async (adminId: number) => {
  // const currentId = (0).toString(); // output: "0"

  let currentAdminId = adminId.toString().substring(3, 4);

  console.log("currentAdminId", currentAdminId);
  console.log("currentAdminId type", typeof currentAdminId);

  let finalNumber = Number(currentAdminId) + 1;

  console.log("finalNumber", finalNumber);
  console.log("finalNumber type", typeof finalNumber);

  const incrementId = finalNumber.toString().padStart(4, "0");

  console.log("incrementId ss", incrementId);

  return incrementId;
};
