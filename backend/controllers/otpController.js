import { userModel } from "../models/userModel.js";
import { otpModel } from "../models/otpModel.js";
import bcrypt from "bcrypt";
import { mailTransporter, sendMail } from "../utils/mailTransporter.js";
import { mailConfig } from "../utils/credentials.js";
import {getOtpHtml} from  "../utils/mailsFormats/otp.js"

class OtpController {
  //password reset OPT...............................................................................
  static async sendOTP(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        throw new Error("email is required to send an OTP");
      }

      const user = await userModel.findOne({ email }, { password: 0 });

      if (!user) {
        throw new Error("Invalid email");
      }

      //generate random nums between 0 and 9 (inclusive)
      const generateOpt = (num) => {
        const opt = Array.from({ length: num }, () => 0);

        opt.forEach(
          (_, i) => (opt[i] = Math.round(Math.floor(Math.random() * 10)))
        );

        return opt.join("").toString();
      };

      const generatedOtp = generateOpt(6);
      console.log("your otp is :", generatedOtp);
      //send mail to specified email address
      //mail options (what to whom)
      const mailOptions = {
        from: {
          name: "RisesLabs",
          address: mailConfig.email,
        },
        to: email,
        subject: "no-reply",
        html:getOtpHtml(generatedOtp)
      };
      //sending mail
        sendMail(mailTransporter, mailOptions);

      //hashing otp
      const salt = await bcrypt.genSalt(4);
      const hashedOtp = await bcrypt.hash(generatedOtp, salt);

      //deleting existing otp if any present
      await otpModel.findOneAndDelete({ userId: user._id });

      const otp = new otpModel({
        otp: hashedOtp,
        userId: user._id,
      });

      await otp.save();

      res.status(200).json({ id: otp._id, userId: otp.userId });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  //verifying entered opt.........................................................................
  static async verifyOTP(req, res) {
    try {
      const { otp, userId, id } = req.body;

      if (!otp) {
        throw new Error("opt is required to verify it is you");
      }

      const user = await userModel.findById(userId);

      if (!user) {
        throw new Error("Invalid request");
      }

      const otpObj = await otpModel.findById(id);

      if (!otpObj) {
        throw new Error("please re-send the request using valid email address");
      }

      //check if otp is expired (after 10 mins)
      const time = new Date(otpObj.createdAt);
      time.setMinutes(time.getMinutes() + 10);

      if (time < Date.now()) {
        throw new Error("otp is expired, please re-send the otp request");
      }

      //decrypting otp
      const decryptedOtp = await bcrypt.compare(otp, otpObj.otp);

      if (!decryptedOtp) {
        throw new Error("wrong opt");
      }

      res.status(200).json({ id: otpObj.id, userId: user._id });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export { OtpController };
