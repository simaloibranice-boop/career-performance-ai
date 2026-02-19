import { useEffect } from "react";
import axios from "axios";

function Results() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios.post(
      "http://localhost:5000/analysis",
      {
        skills: ["React", "Node"],
        experience: "Intermediate",
        recommendation: "Build scalable systems."
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl">Your AI Analysis</h1>
    </div>
  );
}

export default Results;
