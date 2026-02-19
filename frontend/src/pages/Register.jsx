import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    number: "",
    country: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful");
      navigate("/login");
    } else {
      alert(data.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-purple-900 text-white">
      <form onSubmit={handleSubmit} className="bg-black/40 p-8 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        {Object.keys(form).map((field) => (
          <input
            key={field}
            type={field.includes("password") ? "password" : "text"}
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black border border-gray-700"
            required
          />
        ))}

        <button className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
