import { useState } from "react";
import axios from "axios";

function SkillGap() {
  const [skills, setSkills] = useState("");
  const [role, setRole] = useState("frontend");
  const [result, setResult] = useState(null);

  const analyze = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.post("/api/skill-gap", {
      currentSkills: skills.split(",").map(s => s.trim()),
      targetRole: role
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setResult(res.data);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-6">Skill Gap Analyzer</h1>

      <input
        type="text"
        placeholder="Enter skills separated by comma"
        className="w-full p-2 mb-4 bg-gray-800"
        onChange={e => setSkills(e.target.value)}
      />

      <select
        className="w-full p-2 mb-4 bg-gray-800"
        onChange={e => setRole(e.target.value)}
      >
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="fullstack">Fullstack</option>
        <option value="ml">Machine Learning</option>
        <option value="devops">DevOps</option>
      </select>

      <button
        onClick={analyze}
        className="bg-indigo-600 px-4 py-2 rounded"
      >
        Analyze
      </button>

      {result && (
        <div className="mt-6">
          <h2>Readiness Score: {result.readinessScore}%</h2>
          <h3 className="mt-4">Missing Skills:</h3>
          <ul>
            {result.missingSkills.map(skill => (
              <li key={skill}>• {skill}</li>
            ))}
          </ul>

          <h3 className="mt-4">Roadmap:</h3>
          <ul>
            {result.roadmap.map((step, i) => (
              <li key={i}>• {step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SkillGap;
