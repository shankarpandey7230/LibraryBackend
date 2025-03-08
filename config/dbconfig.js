import mongoose from "mongoose";


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