// inserting new burrow

import BurrowHistorySchema from "./BurrowHistorySchema.js";

export const createNewBurrows = (burrowArr) => {
  return BurrowHistorySchema.insertMany(burrowArr);
};

// //update  user

// export const updateUser = (filter, update) => {
//   return burrowSchema.findOneAndUpdate(filter, update, { new: true });
// };

// // get the user

// export const getUserByEmail = (email) => {
//   return burrowSchema.findOne({ email });
// };

// export const getOneUser = (filter) => {
//   return burrowSchema.findOne(filter);
// };
