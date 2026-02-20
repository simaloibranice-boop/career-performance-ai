import { connectDB } from "./db.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).end();

  await connectDB();

  const { name, email, age, number, country, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      name,
      email,
      age,
      number,
      country,
      password: hashed,
      role
    });

    res.status(200).json({ message: "User registered" });
  } catch {
    res.status(400).json({ error: "User exists" });
  }
}
