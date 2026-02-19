import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-purple-900 text-white">
      <form onSubmit={handleSubmit} className="bg-black/40 p-8 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-black border border-gray-700"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 rounded bg-black border border-gray-700"
          required
        />

        <button className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
