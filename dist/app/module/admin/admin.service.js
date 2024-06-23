"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const admin_constant_1 = require("./admin.constant");
const admin_model_1 = require("./admin.model");
const getAllAdminFromDB = async (query) => {
    const adminQuery = new QueryBuilder_1.default(admin_model_1.Admin.find().populate("user"), query)
        .search(admin_constant_1.adminSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await adminQuery.modelQuery;
    return result;
};
const getSingleAdminFromDB = async (id
// query: Record<string, unknown>
) => {
    const result = await admin_model_1.Admin.findById(id).populate("user");
    return result;
};
const updateSingleAdminIntoDB = async (id, payload) => {
    console.log("update service", id, payload);
    // desctucring non-primitive data from payload
    // const { name, ...remainingAdminData } = payload;
    const { name } = payload, remainingAdminData = __rest(payload, ["name"]);
    const modifiedUpdatedData = Object.assign({}, remainingAdminData);
    console.log("modifiedUpdatedData", modifiedUpdatedData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
        console.log("modifiedUpdatedData", modifiedUpdatedData);
        const result = await admin_model_1.Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
            new: true,
            runValidators: true,
        });
        console.log("update service result", result);
        return result;
    }
};
exports.AdminServices = {
    getAllAdminFromDB,
    getSingleAdminFromDB,
    updateSingleAdminIntoDB,
};
