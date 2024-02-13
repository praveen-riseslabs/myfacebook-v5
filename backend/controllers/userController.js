import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { mailTransporter, sendMail } from "../utils/mailTransporter.js";
import { mailConfig } from "../utils/credentials.js";
import crypto from "crypto";
import { createJwtToken } from "../utils/createJwtToken.js";

class UserController {
  //user registration...........................................................................
  static async registerUser(req, res) {
    try {
      const {
        username,
        fullname,
        email,
        phoneNumber,
        gender,
        password,
        confirmPassword,
      } = req.body;

      if (
        !username ||
        !fullname ||
        !email ||
        !phoneNumber ||
        !gender ||
        !password ||
        !confirmPassword
      ) {
        throw new Error("Fields must not be empty");
      }

      if(password !== confirmPassword){
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

      //email tokens
      const token = crypto.randomBytes(16).toString("hex");

      const newUser = new userModel({
        username,
        fullname,
        phoneNumber,
        email,
        gender,
        password: hash,
        emailToken: token,
      });

      await newUser.save();

      //mail options (what to whom)
      const mailOptions = {
        from: {
          name: "RisesLabs",
          address: mailConfig.email,
        },
        to: email, // list of receivers
        subject: "verify your email", // Subject line
        html: `
        <html lang="en">
        <body>
        <div style="width:100%;">
        <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 2rem;
        "
      >
        <h3>Please click on the below link to verify your email</h3>
        <div>
        <a href="${process.env.CLIENT_URL}/verify/${token}" target="_blank" rel="noreferrer">
          <button
            style="
              padding-inline: 1rem;
              padding-block: 0.3rem;
              font-weight: 600;
              border-radius: 0.5rem;
              color: white;
              font-size: 1.1rem;
              background: linear-gradient(to right, #009dff, #8a2be2);
            "
          >
            Verify
          </button>
        </a>
        </div>
      </div>
      </div>
      </body>
      </html>
        `, // html body
      };
      //sending mail
      //   sendMail(mailTransporter, mailOptions);

      res.status(201).json({
        username,
        fullname,
        email,
        phoneNumber,
        gender,
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
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        userId: user._id,
        isTrackingEnabled: user.isTrackingEnabled,
        token: createJwtToken(user._id),
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  //getting user details.........................................................................
  static async getUserDetails(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        throw new Error("User not found");
      }

      const user = await userModel.findById(userId);

      res.status(200).json({
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        userId: user._id,
        isTrackingEnabled: user.isTrackingEnabled,
        isVerified: user.isVerified,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export { UserController };
