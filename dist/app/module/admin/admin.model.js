"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const admin_constant_1 = require("./admin.constant");
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("./../../error/appError"));
const UserNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true,
        validate: {
            // custom validation
            validator: function (value) {
                const firstNameString = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameString === value;
            },
            message: "{VALUE} is not capitalize format",
        },
    },
    middleName: { type: String, maxlength: 20, trim: true },
    lastName: { type: String, required: true, maxlength: 20, trim: true },
});
const AdminSchema = new mongoose_1.Schema({
    id: { type: String, required: true }, // generated id
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        unique: true,
        required: [true, "user id is required"],
        ref: "User", // ref
    },
    designation: { type: String, required: [true, "designation is required"] },
    name: { type: UserNameSchema, required: [true, "Name is required"] },
    gender: {
        type: String,
        enum: {
            values: admin_constant_1.Gender,
            message: "{VALUE} is not a valid gender",
        },
        required: [true, "Gender is required"],
    },
    dateOfBirth: { type: Date, required: [true, "dateofBirth is required"] },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    bloodGroup: {
        type: String,
        BloodGroup: admin_constant_1.BloodGroup,
        required: [true, "BloodGroup is required"],
    },
    contactNo: { type: String, required: [true, "contactNo is required"] },
    emergencyContactNo: {
        type: String,
        required: [true, "emergencyNo is required"],
    },
    presentAddress: {
        type: String,
        required: [true, "presentAddress is required"],
    },
    permanentAddress: {
        type: String,
        required: [true, "permanentAddress is required"],
    },
    profileImage: { type: String, required: [true, "profileImg is required"] },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
// generating full name
AdminSchema.virtual("fullName").get(function () {
    var _a, _b, _c;
    return (((_a = this === null || this === void 0 ? void 0 : this.name) === null || _a === void 0 ? void 0 : _a.firstName) +
        "" +
        ((_b = this === null || this === void 0 ? void 0 : this.name) === null || _b === void 0 ? void 0 : _b.middleName) +
        "" +
        ((_c = this === null || this === void 0 ? void 0 : this.name) === null || _c === void 0 ? void 0 : _c.lastName));
});
// 🤷‍♀️ get all data (without deleted: true) checking
AdminSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
// 🤷‍♀️ get single data (without deleted: true) checking
AdminSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
// 🤷‍♀️ get data by aggregate validation (without deleted: true) checking
AdminSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
// is adminData Exists (in create time checking)
AdminSchema.pre("save", async function (next) {
    const isAdminExists = await exports.Admin.findOne({ email: this.email });
    console.log("isAdminExists", isAdminExists);
    if (isAdminExists) {
        throw new appError_1.default(http_status_1.default.CONFLICT, "data already exists!");
    }
    next();
});
// isQueryExists - query validation (in get time checking)
AdminSchema.pre("find", async function (next) {
    const query = this.getQuery();
    const isAdminDataExist = await exports.Admin.findOne(query);
    if (!isAdminDataExist) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "data not exists!");
    }
    next();
});
exports.Admin = mongoose_1.default.model("Admin", AdminSchema);
