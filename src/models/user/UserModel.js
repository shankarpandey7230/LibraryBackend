import UserSchema from "./UserSchema.js";

// inserting user

export const createNewUser = (userObj) => {
  return UserSchema(userObj).save();
};

//update  user

export const updateUser = (filter, update) => {
  return UserSchema.findOneAndUpdate(filter, update, { new: true });
};
