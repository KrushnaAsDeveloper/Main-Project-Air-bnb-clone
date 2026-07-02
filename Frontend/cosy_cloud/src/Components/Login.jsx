import {  useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show , setShow] = useState("password")
  const {setUser} = useAuth()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
     let res = await axios.post("http://192.168.0.101:5000/login", formData)

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user)
      navigate("/listings/my")

    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }


  };
  const showPass = () =>{
    show == "password" ? setShow("text") : setShow("password")
  }

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
          <div >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex relative justify-center items-center">
              <input
              type={show}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              className="w-full  px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition"
            /> <button className="absolute right-2 cursor-pointer" onClick={showPass}>{show == "password" ? <FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/>} </button> 
            </div>
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
          <NavLink to="/signup" className="text-rose-500 font-medium hover:underline">
            Sign up
          </NavLink>
        </p>

      </div>
    </div>
  );
}
