import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  mobile: number;
  OTP: number;
  userName: string;
}

const UserSchema: Schema<User> = new Schema(
  {
    mobile: {
      type: Number,
      required: [true, "Phone number is required"],
    },
    OTP: {
      type: Number,
      required: [true, "Password is required"],
    },
    userName: {
      type: String,
      default: "Guest",
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
