import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-white/10">

      <Link to="/" className="text-xl font-bold">
        Career Performance AI
      </Link>

      <div className="space-x-6">

        <Link to="/" className="hover:text-indigo-400">
          Home
        </Link>

        {!token && (
          <>
            <Link to="/login" className="hover:text-indigo-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-indigo-400">
              Register
            </Link>
          </>
        )}

        {token && (
          <>
            <Link to="/dashboard" className="hover:text-indigo-400">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-red-400"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
