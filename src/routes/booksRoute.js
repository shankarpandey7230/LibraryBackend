import express from "express";
import {
  getAllBooksController,
  getAllPublicBooksController,
  insertNewBook,
} from "../controllers/bookController.js";
import {
  adminAuthMiddleware,
  userAuthMiddleWare,
} from "../middleware/authMiddleware.js";
import { newBookDataValidation } from "../middleware/validation/bookDataValidation.js";

const router = express.Router();

router.get(
  "/admin",
  userAuthMiddleWare,
  adminAuthMiddleware,
  getAllBooksController
);
// // Public book access
router.get("/", getAllPublicBooksController);

// Inserting the book

router.post(
  "/",
  userAuthMiddleWare,
  adminAuthMiddleware,
  newBookDataValidation,
  insertNewBook
);
export default router;
