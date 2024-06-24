import { Router } from "express";
import { StudentRoutes } from "../module/student/student.route";
import { UserRoutes } from "../module/user/user.route";
import { AcademicSemesterRoutes } from "../module/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../module/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../module/academicDepartment/academicDepartment.route";
import { CourseRoute } from "../module/course/course.route";
import { AdminRoutes } from "../module/admin/admin.route";
import { FacultyRoutes } from "../module/faculty/faculty.route";
const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    route: AcademicDepartmentRoutes,
  },
  {
    path: "/courses",
    route: CourseRoute,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/faculties",
    route: FacultyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
