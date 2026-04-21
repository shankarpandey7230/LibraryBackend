import express from "express";

import {
  adminAuthMiddleware,
  userAuthMiddleWare,
} from "../middleware/authMiddleware.js";
import {
  getBurrowsController,
  insertNewBurrow,
} from "../controllers/burrowController.js";

const router = express.Router();
// insert borrow
router.post("/", userAuthMiddleWare, insertNewBurrow);
// return all borrows for admin request only
router.get(
  "/admin",
  userAuthMiddleWare,
  adminAuthMiddleware,
  getBurrowsController
);
// return user specific borrow list only
router.get("/user", userAuthMiddleWare, getBurrowsController);
export default router;
