import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female", "preferNotToSay"],
      default: "preferNotToSay",
    },
    country: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    district: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    timeZone: {
      type: String,
      default: null,
    },
    pic:{
      type: String,
      default: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
    }
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

export { userModel };
