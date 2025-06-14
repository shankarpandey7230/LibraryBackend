import express from "express";
import {
  activateUser,
  generateOTP,
  insertNewUser,
  loginUser,
  logoutUser,
  resetNewPassword,
} from "../controllers/authController.js";

import {
  loginDataValidation,
  newPasswordResetValidation,
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
router.post("/otp", generateOTP);
router.post("/reset-password", newPasswordResetValidation, resetNewPassword);

export default router;
