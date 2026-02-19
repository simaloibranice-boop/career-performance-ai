import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import { adminOnly } from "./middleware/adminMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = process.env.JWT_SECRET || "supersecretkey";

/* =========================
   DATABASE
========================= */

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/careerAI")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* =========================
   REGISTER
========================= */

app.post("/register", async (req, res) => {
  const { name, email, age, number, country, password, role } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      age,
      number,
      country,
      password: hashed,
      role
    });

    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch {
    res.status(400).json({ error: "User already exists" });
  }
});

/* =========================
   LOGIN
========================= */

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

/* =========================
   ADMIN USERS
========================= */

app.get("/admin/users", adminOnly, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
