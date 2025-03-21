


import UserSchema from "./UserSchema.js";

// insert user
export const createUser = (userObj) => {
    return UserSchema(userObj).save();
}