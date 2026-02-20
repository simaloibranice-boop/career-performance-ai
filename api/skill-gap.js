import { connectDB } from "./db.js";
import { roleSkillMap } from "./skillMap.js";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }

  const { currentSkills, targetRole } = req.body;

  const requiredSkills = roleSkillMap[targetRole.toLowerCase()];
  if (!requiredSkills)
    return res.status(400).json({ error: "Invalid role" });

  const missingSkills = requiredSkills.filter(
    skill => !currentSkills.map(s => s.toLowerCase())
      .includes(skill.toLowerCase())
  );

  const readinessScore = Math.round(
    ((requiredSkills.length - missingSkills.length) /
      requiredSkills.length) * 100
  );

  const roadmap = missingSkills.map(
    (skill, index) =>
      `Week ${index + 1}: Focus on learning ${skill} and build a mini project.`
  );

  res.status(200).json({
    readinessScore,
    missingSkills,
    roadmap
  });
}
