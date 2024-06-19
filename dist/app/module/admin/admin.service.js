"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const admin_constant_1 = require("./admin.constant");
const admin_model_1 = require("./admin.model");
const getAllAdminFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const adminQuery = new QueryBuilder_1.default(admin_model_1.Admin.find(), query)
        .search(admin_constant_1.adminSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield adminQuery.modelQuery;
    return result;
});
const getSingleAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findById(id);
    return result;
});
const updateSingleAdminIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
exports.AdminServices = {
    getAllAdminFromDB,
    getSingleAdminFromDB,
    updateSingleAdminIntoDB,
};
