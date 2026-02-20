import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  age: Number,
  number: String,
  country: String,
  password: String,
  role: { type: String, default: "user" }
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
