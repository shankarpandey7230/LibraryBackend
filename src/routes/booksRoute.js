import express from "express";

import {
  deleteBookController,
  getAllBooksController,
  getAllPublicBooksController,
  getAllSinglePublicBooksController,
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
import multer from "multer";
import { upload } from "../utils/multer.js";
const router = express.Router();

// // Public book access

router.get("/", getAllPublicBooksController);

// public api access for single book
router.get("/public/:slug", getAllSinglePublicBooksController);

router.get(
  "/admin",
  userAuthMiddleWare,
  adminAuthMiddleware,
  getAllBooksController
);

// Inserting the book

router.post(
  "/",
  userAuthMiddleWare,
  adminAuthMiddleware,
  // upload.array("image", 12),
  upload.single("image"),
  newBookDataValidation,
  insertNewBook
);
// update book

router.put(
  "/",
  userAuthMiddleWare,
  adminAuthMiddleware,
  upload.array("images", 2),
  updateBookDataValidation,
  updatedBookController
);

router.delete(
  "/:_id",
  userAuthMiddleWare,
  adminAuthMiddleware,

  deleteBookController
);

export default router;
