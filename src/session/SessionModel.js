import SessionSchema from "./SessionSchema.js";

//store the schema

export const createSession = (sessionObj) => {
    return SessionSchema(sessionObj).save();
}