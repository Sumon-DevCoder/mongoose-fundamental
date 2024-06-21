import mongoose, { Schema } from "mongoose";
import { TAdmin, TUserName } from "./admin.interface";
import { Gender, BloodGroup } from "./admin.constant";

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    maxlength: 20,
    trim: true,
    validate: {
      // custom validation
      validator: function (value: string) {
        const firstNameString = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameString === value;
      },
      message: "{VALUE} is not capitalize format",
    },
  },
  middleName: { type: String, maxlength: 20, trim: true },
  lastName: { type: String, required: true, maxlength: 20, trim: true },
});

const AdminSchema = new Schema<TAdmin>(
  {
    id: { type: String, required: true }, // generated id
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: [true, "user id is required"],
      ref: "User", // ref
    },
    designation: { type: String, required: [true, "designation is required"] },
    name: { type: UserNameSchema, required: [true, "Name is required"] },
    gender: {
      type: String,
      enum: {
        values: Gender,
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
      BloodGroup,
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
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function (next) {
  const isAdminExists = await Admin.findOne({ email: this.email });

  console.log("isAdminExists", isAdminExists);
});

AdminSchema.pre("find", async function (next) {
  const query = this.getQuery();
  console.log("middleware query", query);
  // const isAdminDataExist = await Admin.find(query);

  // console.log("isAdminDataExist", isAdminDataExist);
});

export const Admin = mongoose.model<TAdmin>("Admin", AdminSchema);
