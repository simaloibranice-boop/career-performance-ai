import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);

  if (!role) return null;

  return (
    <div className="min-h-screen p-10">

      <h1 className="text-3xl font-bold mb-6">
        {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
      </h1>

      {role === "admin" ? (
        <div className="bg-red-900/40 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Admin Controls</h2>
          <ul className="space-y-2">
            <li>• View all users</li>
            <li>• Manage community posts</li>
            <li>• Review reported content</li>
          </ul>
        </div>
      ) : (
        <div className="bg-indigo-900/40 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Your Activity</h2>
          <ul className="space-y-2">
            <li>• View your analysis history</li>
            <li>• Track skill progress</li>
            <li>• Join community discussions</li>
          </ul>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
