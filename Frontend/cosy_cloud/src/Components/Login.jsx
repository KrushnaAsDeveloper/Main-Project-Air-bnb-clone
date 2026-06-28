import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      localStorage.setItem("token", data.token);
      console.log("Logged in!", data.user);
      // TODO: setUser(data.user) via AuthContext + navigate('/')

    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">

        {/* Brand */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-rose-500 tracking-tight">cosy_cloud</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-rose-500 font-medium hover:underline">
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
}
