import mongoose from "mongoose";

const healthSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    username: {
      type: String,
      requied: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    descripiton: {
      type: String,
      trim: true,
      default: "",
    },
    adharCardNumber: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    files: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const healthModel = mongoose.model("health", healthSchema);

export { healthModel };
