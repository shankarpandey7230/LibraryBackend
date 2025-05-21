import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    refreshJWT: {
      type: String,
    },
  },
  { timeStamp: true }
);

export default mongoose.model("User", UserSchema);
