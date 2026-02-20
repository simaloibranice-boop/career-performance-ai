import { useState } from "react";
import axios from "axios";
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
    confirmPassword: "",
    role: "user"
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("/api/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-black/40 p-8 rounded-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 bg-gray-900 rounded" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 bg-gray-900 rounded" />
        <input name="age" placeholder="Age" onChange={handleChange} className="w-full p-2 bg-gray-900 rounded" />
        <input name="number" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 bg-gray-900 rounded" />
        <input name="country" placeholder="Country" onChange={handleChange} className="w-full p-2 bg-gray-900 rounded" />

        <select name="role" onChange={handleChange} className="w-full p-2 bg-gray-900 rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 bg-gray-900 rounded" />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="w-full p-2 bg-gray-900 rounded" />

        <button className="w-full bg-purple-600 p-2 rounded hover:bg-purple-700">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
