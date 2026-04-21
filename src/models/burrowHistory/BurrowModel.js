// inserting new burrow

import BurrowHistorySchema from "./BurrowHistorySchema.js";

export const createNewBurrows = (burrowArr) => {
  return BurrowHistorySchema.insertMany(burrowArr);
};

//for specific user
// if no books for the user it will return entire records
export const getBurrows = (filter) => {
  return BurrowHistorySchema.find(filter);
};
