import { Schema, model } from "mongoose";
import {
  Gurdian,
  LocalGurdian,
  StudentModel,
  TStudent,
  UserName,
} from "./student.interface";
import validator from "validator";
import AppError from "../../error/appError";
import httpStatus from "http-status";

const userSchema = new Schema<UserName>({
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
      validator: function (value: string) {
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
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
});

const gurdianSchema = new Schema<Gurdian>({
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

const localGurdianSchema = new Schema<LocalGurdian>({
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

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    // step  2
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User", // reference
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: [true, "admission Semester id is required"],
      unique: true,
      ref: "AcademicSemester", // reference
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
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
        validator: (value: string) => validator.isEmail(value),
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
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// virtual
studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// create custom instance method
// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// create custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// in delete time existingStudent checking
studentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();

  const existingStudent = await Student.findOne(query);

  if (!existingStudent) {
    throw new AppError(404, "Student does not exists!");
  }

  next();
});

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
