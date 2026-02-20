import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import Results from "./pages/Results";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Community from "./pages/Community";
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white bg-gradient-to-br from-black via-gray-900 to-indigo-950">

        <Navbar />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/community" element={<Community />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }/>

          <Route path="/results" element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }/>

          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }/>

          <Route path="/analytics" element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }/>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
