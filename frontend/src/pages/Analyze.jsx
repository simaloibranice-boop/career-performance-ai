import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Analyze() {
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("junior");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/analyze", {
        skills,
        experience
      });

      navigate("/results", { state: response.data });
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20">

      <h2 className="text-4xl font-bold text-center mb-8">
        Analyze Your Skills
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6"
      >

        <div>
          <label className="block mb-2">List Your Skills (comma separated)</label>
          <textarea
            className="w-full p-4 rounded-lg bg-black/60 border border-white/10"
            rows="4"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2">Experience Level</label>
          <select
            className="w-full p-3 rounded-lg bg-black/60 border border-white/10"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        {error && (
          <p className="text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded-lg py-3 font-semibold"
        >
          {loading ? "Analyzing..." : "Run AI Analysis"}
        </button>

      </form>
    </div>
  );
}

export default Analyze;
