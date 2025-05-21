import mongoose from "mongoose";

<<<<<<< HEAD
export const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("Check your database connection string");
  }
  return mongoose.connect(process.env.MONGO_URL);
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
=======

export const connectDB = async () => {
  
           if (!process.env.MONGO_URL) {
        throw new Error("Fix your Mongo URL string")
           }
    return mongoose.connect(process.env.MONGO_URL)
   
}
// export const connectDB = async () => {
//     try {
//            if (!process.env.MONGO_URL) {
//         throw new Error("Fix your Mongo URL string")
//     }
//         const connection = await mongoose.connect(process.env.MONGO_URL);
//         connection && console.log("Database Connected")
     
//     } catch (error) {
//         console.log(error)
        
//     }
 
// }
>>>>>>> 632702bc2782d33a0433146f80eb3004181e52ef
