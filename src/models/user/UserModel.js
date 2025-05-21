<<<<<<< HEAD
import UserSchema from "./UserSchema.js";

// inserting user

export const createNewUser = (userObj) => {
  return UserSchema(userObj).save();
};
=======



import UserSchema from "./UserSchema.js";

// insert user
export const createUser = (userObj) => {
    return UserSchema(userObj).save();
}
>>>>>>> 632702bc2782d33a0433146f80eb3004181e52ef
