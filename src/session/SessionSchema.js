import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    association: {
      type: String,
    },
    expire: {
      type: Date,
      default: new Date(Date.now() + 1000 * 60 * 60),
      expires: 0,
    },
  },
  { timestamps: true }
);
export default mongoose.models.Session ||
  mongoose.model("Session", SessionSchema);
