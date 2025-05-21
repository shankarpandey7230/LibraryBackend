import SessionSchema from "./SessionSchema.js";

// inserting user

export const createNewSession = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};
