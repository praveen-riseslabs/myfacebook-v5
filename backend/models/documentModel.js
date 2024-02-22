import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
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
    description: {
      type: String,
      trim: true,
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

documentSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const documentModel = mongoose.model("documents", documentSchema);

export { documentModel };
