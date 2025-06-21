import jwt from "jsonwebtoken";
import { createNewSession } from "../models/session/SessionModel.js";
import { updateUser } from "../models/user/UserModel.js";

//generate accessJWT

export const createAccessJWT = async (email) => {
  // create
  const token = jwt.sign({ email }, process.env.ACCESSJWT_SECRET, {
    expiresIn: "1d",
  });

  // store
  const obj = {
    token,
    association: email,
    expire: new Date(Date.now() + 20 * 60 * 1000), //15min
  };
  const newSession = await createNewSession(obj);
  return newSession?._id ? token : null;
};

// decode accessJWT
export const verifyAccessJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESSJWT_SECRET);
    return decoded;
  } catch (error) {
    return error.message;
  }
};

// generate refresh JWT
export const createRefreshJWT = async (email) => {
  const refreshJWT = jwt.sign({ email }, process.env.REFRESHJWT_SECRET, {
    expiresIn: "30d",
  });
  //store
  //   console.log(refreshJWT);
  const obj = {
    refreshJWT,
    expire: new Date(Date.now() + 30 * 60 * 60 * 100),
  };
  const user = await updateUser({ email }, { refreshJWT });
  console.log(user);
  return user?._id ? refreshJWT : null;
};

// decode refreshJWT
export const verifyRefreshJWT = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESHJWT_SECRET);
  } catch (error) {
    return error.message;
  }
};

export const getJwts = async (email) => {
  return {
    accessJWT: await createAccessJWT(email),
    refreshJWT: await createRefreshJWT(email),
  };
};
