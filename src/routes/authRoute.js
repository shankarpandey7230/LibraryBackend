import express from "express";
import {
  activateUser,
  insertNewUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";

import {
  loginDataValidation,
  newUserDataValidation,
  userActivationDataValidation,
} from "../middleware/validation/authDataValidation.js";
import {
  renewAccessJWTMiddleware,
  userAuthMiddleWare,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// user sign up
router.post("/register", newUserDataValidation, insertNewUser);
router.post("/activate-user", userActivationDataValidation, activateUser);
router.post("/login", loginDataValidation, loginUser);
router.get("/renew-jwt", renewAccessJWTMiddleware);
router.get("/logout", userAuthMiddleWare, logoutUser);

export default router;
