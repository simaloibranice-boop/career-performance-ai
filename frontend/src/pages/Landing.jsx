import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-[80vh] max-w-4xl mx-auto">

      <h1 className="text-6xl font-extrabold leading-tight">
        Unlock Your
        <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          {" "}Career Potential
        </span>
      </h1>

      <p className="mt-6 text-lg text-gray-300 max-w-2xl">
        AI-powered skill intelligence that analyzes your strengths,
        matches you to high-demand roles, and builds a personalized roadmap
        to global tech opportunities.
      </p>

      <div className="mt-10 flex gap-6">
        <Link
          to="/analyze"
          className="px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-semibold"
        >
          Start Analysis
        </Link>

        <Link
          to="/dashboard"
          className="px-8 py-3 rounded-lg border border-white/20 hover:border-indigo-400 transition"
        >
          View Dashboard
        </Link>
      </div>

    </div>
  );
}

export default Landing;
