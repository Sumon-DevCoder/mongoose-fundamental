"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyServices = void 0;
const academicFaculty_model_1 = require("./academicFaculty.model");
const createAcademicFacultyIntoDB = async (payload) => {
    const result = await academicFaculty_model_1.AcademicFaculty.create(payload);
    return result;
};
const getAllAcademicFacultiesFromDB = async () => {
    const result = await academicFaculty_model_1.AcademicFaculty.find();
    return result;
};
const getSingleAcademicFacultyFromDB = async (id) => {
    const result = await academicFaculty_model_1.AcademicFaculty.findOne({ id });
    return result;
};
const updateSingleAcademicFacultyIntoDB = async (id, payload) => {
    const result = await academicFaculty_model_1.AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
exports.AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateSingleAcademicFacultyIntoDB,
};
