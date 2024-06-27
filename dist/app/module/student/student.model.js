"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const appError_1 = __importDefault(require("../../error/appError"));
const userSchema = new mongoose_1.Schema({
    firstName: {
        id: {
            type: String,
            required: true,
        },
        type: String,
        required: [true, "first name is required"],
        maxlength: 20,
        trim: true,
        // custom validation
        validate: {
            validator: function (value) {
                const firstNameString = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameString === value;
            },
            message: "{VALUE} is not capitalize format",
        },
    },
    middleName: {
        type: String,
        maxlength: 20,
    },
    lastName: {
        type: String,
        required: [true, "last name is required"],
        // npm package validation
        validate: {
            validator: (value) => validator_1.default.isAlpha(value),
            message: "{VALUE} is not valid",
        },
    },
});
const gurdianSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
        trim: true,
        required: true,
    },
    fatherOccupation: {
        type: String,
        required: true,
    },
    fatherContactNo: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    motherOccupation: {
        type: String,
        required: true,
    },
    motherContactNo: {
        type: String,
        required: true,
    },
});
const localGurdianSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    // step  2
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User id is required"],
        unique: true,
        ref: "User", // reference
    },
    admissionSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "admission Semester id is required"],
        unique: true,
        ref: "AcademicSemester", // reference
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "academic Department id is required"],
        unique: true,
        ref: "AcademicDepartment", // reference
    },
    name: {
        type: userSchema,
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: "The gender field can only one of following field",
        },
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // npm package validation
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: "{VALUE} is not valid email type",
        },
    },
    contactNumber: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    guardian: {
        type: gurdianSchema,
        required: true,
    },
    localGuardian: {
        type: localGurdianSchema,
        required: true,
    },
    profileImg: { type: String },
    isDeleted: { type: Boolean, default: false },
}, {
    toJSON: {
        virtuals: true,
    },
});
// virtual
studentSchema.virtual("fullName").get(function () {
    var _a, _b, _c;
    return `${(_a = this === null || this === void 0 ? void 0 : this.name) === null || _a === void 0 ? void 0 : _a.firstName} ${(_b = this === null || this === void 0 ? void 0 : this.name) === null || _b === void 0 ? void 0 : _b.middleName} ${(_c = this === null || this === void 0 ? void 0 : this.name) === null || _c === void 0 ? void 0 : _c.lastName}`;
});
// create custom instance method
// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };
// create custom static method
studentSchema.statics.isUserExists = async function (id) {
    const existingUser = await exports.Student.findOne({ id });
    return existingUser;
};
// in delete time existingStudent checking
studentSchema.pre("findOneAndUpdate", async function (next) {
    const query = this.getQuery();
    const existingStudent = await exports.Student.findOne(query);
    if (!existingStudent) {
        throw new appError_1.default(404, "Student does not exists!");
    }
    next();
});
studentSchema.pre("findOne", async function () {
    const query = this.getQuery();
    const isStudentExists = await exports.Student.find(query);
    if (!isStudentExists.length) {
        throw new appError_1.default(404, "student not found");
    }
});
exports.Student = (0, mongoose_1.model)("Student", studentSchema);
