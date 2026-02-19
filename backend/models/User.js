import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  age: Number,
  number: String,
  country: String,
  password: String,
  role: { type: String, default: "user" }
});

export default mongoose.model("User", userSchema);
