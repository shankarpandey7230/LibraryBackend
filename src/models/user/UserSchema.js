import mongoose from "mongoose";

<<<<<<< HEAD
const UserSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
=======
const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "user",
      required:true,
    },
    status: {
      type: String,
      default:"inactive",
>>>>>>> 632702bc2782d33a0433146f80eb3004181e52ef
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
    role: {
      type: String,
      default: "user",
      required: true,
=======
    phone: {
      type: String,
      default: "",
>>>>>>> 632702bc2782d33a0433146f80eb3004181e52ef
    },
    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
<<<<<<< HEAD
    phone: {
      type: String,
    },
=======
>>>>>>> 632702bc2782d33a0433146f80eb3004181e52ef
    password: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
    refreshJWT: {
      type: String,
    },
  },
  { timeStamp: true }
);

export default mongoose.model("User", UserSchema);
=======
    // refreshJWT: {
    //   type: String,
    //   default: "",
    // },
    // isVerified: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationToken: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
>>>>>>> 632702bc2782d33a0433146f80eb3004181e52ef
