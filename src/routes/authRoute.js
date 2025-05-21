<<<<<<< HEAD
import express from "express";
import { insertNewUser } from "../controllers/authController.js";

const router = express.Router();

// user sign up
router.post("/register", insertNewUser);

export default router;
=======
import express from 'express'
import { insertNewUser } from '../controllers/authController.js'

const router = express.Router()






// user Signup 
router.post("/register",insertNewUser)

export default router
>>>>>>> 632702bc2782d33a0433146f80eb3004181e52ef
