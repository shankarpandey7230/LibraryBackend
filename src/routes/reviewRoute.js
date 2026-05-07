import express from "express";
// import { responseClient } from "../middleware/responseClient.js";
import { userAuthMiddleWare } from "../middleware/authMiddleware.js";
import { insertReviewController } from "../controllers/reviewController.js";
import { newReviewDataValidation } from "../middleware/validation/reviewDataValidation.js";

const router = express.Router();

router.post(
  "/",
  userAuthMiddleWare,
  newReviewDataValidation,
  insertReviewController
);

export default router;
