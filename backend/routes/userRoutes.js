import express from "express";
import { UserController } from "../controllers/userController.js";

const router = express.Router();

//normal login routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

export default router