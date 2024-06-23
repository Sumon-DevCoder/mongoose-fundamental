"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminId = exports.generateStudentId = void 0;
const user_model_1 = require("./user.model");
const findLastStudentId = async () => {
    const lastStudent = await user_model_1.UserModel.findOne({
        role: "student",
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    // 200501  0001
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent.id : undefined;
};
const generateStudentId = async (payload) => {
    let currentId = (0).toString(); // by default "0"
    // 2030 01 0001
    const lastStudentId = await findLastStudentId();
    const lastStudentSemesterCode = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(4, 6);
    const lastStudentYear = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(0, 4);
    const currentSemesterCode = payload.code;
    const currentYear = payload.year;
    if (lastStudentId &&
        lastStudentSemesterCode === currentSemesterCode &&
        lastStudentYear === currentYear) {
        currentId = lastStudentId.substring(6); // 0001
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
};
exports.generateStudentId = generateStudentId;
// Admin ID Generate
const findLastAdminId = async () => {
    const lastAdmin = await user_model_1.UserModel.findOne({
        role: "admin",
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id) ? lastAdmin.id : undefined; // output: "A-0001"
};
const generateAdminId = async () => {
    let currentId = (0).toString(); // output: "0"
    const lastAdminId = await findLastAdminId();
    if (lastAdminId) {
        currentId = lastAdminId.substring(5, 6); // output: "1"
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `A-${incrementId}`;
    return incrementId;
};
exports.generateAdminId = generateAdminId;
