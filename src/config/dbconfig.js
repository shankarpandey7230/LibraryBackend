import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("Check your database connection string");
  }
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// export const connectDB = async () => {
//   try {
//     if (!process.env.MONGO_URL) {
//       throw new Error("Check your database connection string");
//     }
//     const connection = await mongoose.connect(process.env.MONGO_URL);
//     // connection && console.log("Database Connection Established");
//   } catch (error) {
//     console.log(error);
//   }
// };
