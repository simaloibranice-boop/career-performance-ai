import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  skills: [String],
  experience: String,
  recommendation: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Analysis", analysisSchema);
