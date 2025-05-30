import express from "express";
import {
  activateUser,
  insertNewUser,
  loginUser,
} from "../controllers/authController.js";

import {
  loginDataValidation,
  newUserDataValidation,
  userActivationDataValidation,
} from "../middleware/validation/authDataValidation.js";

const router = express.Router();

// user sign up
router.post("/register", newUserDataValidation, insertNewUser);
router.post("/activate-user", userActivationDataValidation, activateUser);
router.post("/login", loginDataValidation, loginUser);

export default router;
