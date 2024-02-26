import express from "express";
import { UserController } from "../controllers/userController.js";
import { OtpController } from "../controllers/otpController.js";
import {requireAuth} from "../middlewares/requireAuth.js"

const router = express.Router();

//normal login routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

//send reset password otp
router.post("/password-recovery", OtpController.sendOTP);

//verify otp
router.post("/otp-verify", OtpController.verifyOTP);

// //reset password
router.put("/reset-password", UserController.resetPassword);

//user details route
router.get("/", requireAuth, UserController.getUserDetails);

//update user details route
router.put("/update", requireAuth, UserController.updateUserDetails);

export default router