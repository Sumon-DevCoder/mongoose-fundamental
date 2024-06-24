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
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const admin_constant_1 = require("./admin.constant");
const admin_model_1 = require("./admin.model");
const appError_1 = __importDefault(require("../../error/appError"));
const user_model_1 = require("../user/user.model");
const admin_utils_1 = require("./admin.utils");
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
    await (0, admin_utils_1.isAdminSingleIdExists)(id);
    const result = await admin_model_1.Admin.findById(id).populate("user");
    return result;
};
const updateSingleAdminIntoDB = async (id, payload) => {
    // desctucring non-primitive data from payload
    const { name } = payload, remainingAdminData = __rest(payload, ["name"]);
    const modifiedUpdatedData = Object.assign({}, remainingAdminData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    // isIdExists
    await (0, admin_utils_1.isAdminSingleIdExists)(id);
    const result = await admin_model_1.Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
};
const deleteSingleAdminFromDB = async (id) => {
    // isIdExists
    await (0, admin_utils_1.isAdminSingleIdExists)(id);
    // start session
    const session = await mongoose_1.default.startSession();
    try {
        // start transaction
        session.startTransaction();
        // transaction - 1
        const deletedAdmin = await admin_model_1.Admin.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        if (!deletedAdmin) {
            throw new appError_1.default(400, "Failed to deleted admin");
        }
        // transaction - 2
        const userId = deletedAdmin.user;
        const deletedUser = await user_model_1.UserModel.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new appError_1.default(400, "Failed to deleted user");
        }
        await session.commitTransaction(); // delete parmanently to database
        await session.endSession();
        return {
            deletedAdmin,
            deletedUser,
        };
    }
    catch (err) {
        session.abortTransaction();
        session.endSession();
        throw new Error(err);
    }
};
exports.AdminServices = {
    getAllAdminFromDB,
    getSingleAdminFromDB,
    updateSingleAdminIntoDB,
    deleteSingleAdminFromDB,
};
