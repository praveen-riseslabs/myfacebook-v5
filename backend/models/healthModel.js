import mongoose from "mongoose";

const healthSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    belongTo: {
      type: String,
      required: true,
    },
    files: [
      {
        type: String,
      },
    ],
    trashed: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

healthSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const healthModel = mongoose.model("documents", healthSchema);

export { healthModel };
