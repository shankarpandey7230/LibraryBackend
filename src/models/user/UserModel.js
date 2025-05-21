import UserSchema from "./UserSchema.js";

// inserting user

export const createNewUser = (userObj) => {
  return UserSchema(userObj).save();
};
