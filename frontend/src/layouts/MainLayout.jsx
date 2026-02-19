import { Outlet, Link } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-950 text-white">
      
      <nav className="flex justify-between items-center p-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-wide">
          Career Performance AI
        </h1>

        <div className="space-x-6 text-sm">
          <Link to="/" className="hover:text-indigo-400">Home</Link>
          <Link to="/dashboard" className="hover:text-indigo-400">Dashboard</Link>
          <Link to="/analyze" className="hover:text-indigo-400">Analyze</Link>
          <Link to="/results" className="hover:text-indigo-400">Results</Link>
        </div>
      </nav>

      <div className="p-8">
        <Outlet />
      </div>

    </div>
  );
}

export default MainLayout;
