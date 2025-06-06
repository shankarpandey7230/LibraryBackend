import express from "express";
import { responseClient } from "../middlewares/responseClient.js";

import { userAuthMiddleWare } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", userAuthMiddleWare, async (req, res) => {
  const user = req.userInfo;
  user.password = undefined;
  user.__v = undefined;
  user.refreshJWT = undefined;
  // const { password, _v, refreshJWT, ...user } = req.userInfo;
  return responseClient({
    req,
    res,
    message: "User Profile",
    payload: user,
  });
});

export default router;
