import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUsers(res.data))
    .catch(() => alert("Admin access required"));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-6">Admin Panel</h1>

      {users.map(user => (
        <div key={user._id} className="border p-4 mb-2 rounded">
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
      ))}
    </div>
  );
}

export default Admin;
