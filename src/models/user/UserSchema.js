import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "user",
      required: true,
    },
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
    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    refreshJWT: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
