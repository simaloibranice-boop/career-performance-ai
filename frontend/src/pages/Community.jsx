import { useEffect, useState } from "react";
import axios from "axios";

function Community() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/posts")
      .then(res => setPosts(res.data));
  }, []);

  const createPost = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/posts",
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    window.location.reload();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-6">Community</h1>

      {token && (
        <form onSubmit={createPost} className="mb-8 space-y-4">
          <input
            placeholder="Title"
            className="w-full p-2 bg-black border"
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            className="w-full p-2 bg-black border"
            onChange={e => setForm({ ...form, content: e.target.value })}
          />
          <button className="bg-purple-600 px-4 py-2">Post</button>
        </form>
      )}

      {posts.map(post => (
        <div key={post._id} className="border p-4 mb-4">
          <h2 className="text-xl">{post.title}</h2>
          <p>{post.content}</p>
          <small>By {post.author?.name}</small>
        </div>
      ))}
    </div>
  );
}

export default Community;
