import express from "express";
import { activateUser, insertNewUser } from "../controllers/authController.js";

import {
  newUserDataValidation,
  userActivationDataValidation,
} from "../middleware/validation/authDataValidation.js";

const router = express.Router();

// user sign up
router.post("/register", newUserDataValidation, insertNewUser);
router.post("/activate-user", userActivationDataValidation, activateUser);

export default router;
