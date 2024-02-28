import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createJwtToken } from "../utils/createJwtToken.js";
import { otpModel } from "../models/otpModel.js";

class UserController {
  //user registration...........................................................................
  static async registerUser(req, res) {
    try {
      const { username, email, password, confirmPassword } = req.body;

      if (!username || !email || !password || !confirmPassword) {
        throw new Error("Fields must not be empty");
      }

      if (password !== confirmPassword) {
        throw new Error("Confirm password must match password");
      }

      const emailExist = await userModel.findOne({ email });

      if (emailExist) {
        throw new Error("Email already in use");
      }

      const usernameExist = await userModel.findOne({ username });

      if (usernameExist) {
        throw new Error("username already taken");
      }

      //encrypting password
      const salt = await bcrypt.genSalt(Number(process.env.SALT_VALUE));
      const hash = await bcrypt.hash(password, salt);

      const newUser = new userModel({
        username,
        email,
        password: hash,
      });

      await newUser.save();

      res.status(201).json({
        username,
        email,
        token: createJwtToken(newUser._id),
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  //login user...................................................................................
  static async loginUser(req, res) {
    try {
      const { usernameOrEmail, password } = req.body;

      if (!usernameOrEmail || !password) {
        throw new Error("Fields must not be empty");
      }

      const user = await userModel.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });

      if (!user) {
        throw new Error("User not found");
      }

      const pass = await bcrypt.compare(password, user.password);

      if (!pass) {
        throw new Error("User not found");
      }

      res.status(200).json({
        username: user.username,
        email: user.email,
        token: createJwtToken(user._id),
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  //getting user details.........................................................................
  static async getUserDetails(req, res) {
    try {
      const user = req.user;

      if (!user) {
        throw new Error("User not found");
      }

      res.status(200).json({
        username: user.username,
        email: user.email,
        userId: user._id,
        fullname: user.fullname,
        gender: user.gender,
        country: user.country,
        state: user.state,
        district: user.district,
        phoneNumber: user.phoneNumber,
        timeZone: user.timeZone,
        pic: user.pic,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  //updating user details.........................................................................
  static async updateUserDetails(req, res) {
    try {
      const user = req.user;

      if (!user) {
        throw new Error("User not found");
      }

      const {
        username,
        email,
        fullname,
        gender,
        country,
        state,
        district,
        phoneNumber,
        timeZone,
        pic,
      } = req.body;

      if (!username || !email) {
        throw new Error("username & email are required");
      }

      const updatedUser = await userModel.findByIdAndUpdate(
        user._id,
        {
          username,
          email,
          fullname,
          gender,
          country,
          state,
          district,
          phoneNumber,
          timeZone,
          pic,
        },
        { new: true }
      );

      res.status(200).json({
        username: updatedUser.username,
        email: updatedUser.email,
        fullname: updatedUser.fullname,
        gender: updatedUser.gender,
        country: updatedUser.country,
        state: updatedUser.state,
        district: updatedUser.district,
        phoneNumber: updatedUser.phoneNumber,
        timeZone: updatedUser.timeZone,
        pic: updatedUser.pic,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  //reset password.........................................................................
  static async resetPassword(req, res) {
    try {
      const { password, confirmPassword, userId, id } = req.body;

      if (!id || !userId || !password || !confirmPassword) {
        throw new Error("fields cannot be empty");
      }

      if (confirmPassword !== password) {
        throw new Error("confirm password must match password");
      }

      const otp = await otpModel.findById(id);

      if (!otp) {
        throw new Error("something went wrong, please try again");
      }

      await otpModel.findByIdAndDelete(id);

      const user = await userModel.findById(userId);

      if (!user) {
        throw new Error("Invalid request");
      }

      //encrypting password
      const salt = await bcrypt.genSalt(Number(process.env.SALT_VALUE));
      const hash = await bcrypt.hash(password, salt);

      await userModel.findByIdAndUpdate(userId, { $set: { password: hash } });

      res.status(200).json({ message: "success" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export { UserController };
