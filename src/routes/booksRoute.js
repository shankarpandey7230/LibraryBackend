import express from "express";
import {
  getAllBooksController,
  getAllPublicBooksController,
  insertNewBook,
  updatedBookController,
} from "../controllers/bookController.js";
import {
  adminAuthMiddleware,
  userAuthMiddleWare,
} from "../middleware/authMiddleware.js";
import {
  newBookDataValidation,
  updateBookDataValidation,
} from "../middleware/validation/bookDataValidation.js";

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
// update book

router.put(
  "/",
  userAuthMiddleWare,
  adminAuthMiddleware,
  updateBookDataValidation,
  updatedBookController
);
export default router;
