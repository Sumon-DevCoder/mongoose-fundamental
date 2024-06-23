"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentServices = void 0;
const academicDepartment_model_1 = require("./academicDepartment.model");
const createAcademicDepartmentIntoDB = async (payload) => {
    const result = await academicDepartment_model_1.AcademicDepartment.create(payload);
    return result;
};
const getAllAcademicDepartmentFromDB = async () => {
    const result = await academicDepartment_model_1.AcademicDepartment.find().populate("academicFaculty");
    return result;
};
const getSingleAcademicDepartmentFromDB = async (id) => {
    const result = await academicDepartment_model_1.AcademicDepartment.findOne({ _id: id }).populate("academicFaculty");
    return result;
};
const updateSingleAcademicDepartmentIntoDB = async (id, payload) => {
    const result = await academicDepartment_model_1.AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
exports.AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getSingleAcademicDepartmentFromDB,
    updateSingleAcademicDepartmentIntoDB,
    getAllAcademicDepartmentFromDB,
};
