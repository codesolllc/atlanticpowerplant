import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    otpCode: {
      type: String,
      require: Number,
    },
    otpExpire: {
      type: String,
      require: Number,
    },
    role: {
      type: [String],
      default:['Admin']
    },
  },
  { timestamps: true }
);

export default model("User", UserSchema);
