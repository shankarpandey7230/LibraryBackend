import express from "express";
import { insertNewBook } from "../controllers/bookController.js";
import {
  adminAuthMiddleware,
  userAuthMiddleWare,
} from "../middleware/authMiddleware.js";
import { newBookDataValidation } from "../middleware/validation/bookDataValidation.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "TODO" });
});

// Inserting the book

router.post(
  "/",
  userAuthMiddleWare,
  newBookDataValidation,
  adminAuthMiddleware,
  insertNewBook
);
export default router;
