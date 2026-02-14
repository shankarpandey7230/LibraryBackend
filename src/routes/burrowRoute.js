import express from "express";

import { userAuthMiddleWare } from "../middleware/authMiddleware.js";
import { insertNewBurrow } from "../controllers/burrowController.js";

const router = express.Router();

router.post("/", userAuthMiddleWare, insertNewBurrow);

export default router;
