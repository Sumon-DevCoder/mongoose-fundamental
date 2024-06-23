"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const appError_1 = __importDefault(require("../../error/appError"));
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ["admin", "student", "faculty"],
        required: true,
    },
    status: {
        type: String,
        enum: ["in-progress", "blocked"],
        required: true,
        default: "in-progress",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
// pre save middleware / hooks --> we will create() and save()
userSchema.pre("save", async function (next) {
    const user = this; // here is this keyword referred document
    user.password = await bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
    next();
});
// post save middleware / hooks
userSchema.post("save", async function (doc, next) {
    doc.password = "";
    next();
});
// query middleware --> using find
userSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
// query middleware --> using findOne
userSchema.pre("findOne", function (next) {
    this.findOne({ isDeleted: { $ne: true } });
    next();
});
// query middleware --> using pipeline
userSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
// in delete time existingUser checking
userSchema.pre("findOneAndUpdate", async function (next) {
    const query = this.getQuery();
    const existingUser = await exports.UserModel.findOne(query);
    if (!existingUser) {
        throw new appError_1.default(404, "User does not exists!");
    }
    next();
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
