import { Schema, model } from "mongoose";
import { TUser } from "./user.interfaces";
import bcrypt from "bcrypt";
import config from "../../config";
import AppError from "../../error/appError";

const userSchema = new Schema<TUser>(
  {
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
  },
  { timestamps: true }
);

// pre save middleware / hooks --> we will create() and save()
userSchema.pre("save", async function (next) {
  const user = this; // here is this keyword referred document
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
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

  const existingUser = await UserModel.findOne(query);

  if (!existingUser) {
    throw new AppError(404, "User does not exists!");
  }

  next();
});

export const UserModel = model<TUser>("User", userSchema);
