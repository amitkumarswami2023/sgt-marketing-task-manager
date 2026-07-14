import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"; // Put your logo here
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(login(formData));

    console.log(result);

    if (login.fulfilled.match(result)) {
      console.log("Navigating to dashboard...");
      toast.success("Login Successful");
      const role = result.payload.user.role;

      if (role === "admin") {
        navigate("/");
      } else if (role === "team-lead") {
        navigate("/teamlead");
      } else {
        navigate("/employee");
      }
    } else {
      toast.error("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center px-5">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl grid lg:grid-cols-2">
        {/* Left */}

        <div className="hidden lg:flex flex-col justify-center items-center bg-slate-900 text-white p-12">
          <img src={logo} alt="Logo" className="w-28 mb-8" />

          <h1 className="text-4xl font-bold text-center">
            Marketing Command Center
          </h1>

          <p className="text-slate-300 mt-5 text-center leading-8">
            Executive Marketing Dashboard for Digital Marketing Team.
          </p>
        </div>

        {/* Right */}

        <div className="p-10">
          <h2 className="text-3xl font-bold">Welcome Back 👋</h2>

          <p className="text-slate-500 mt-2">Login to continue</p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* Email */}

            <div>
              <label className="text-sm font-semibold">Email</label>

              <div className="mt-2 flex items-center border rounded-xl px-4">
                <Mail className="text-slate-400" size={18} />

                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Enter Email"
                  className="w-full p-4 outline-none"
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="text-sm font-semibold">Password</label>

              <div className="mt-2 flex items-center border rounded-xl px-4">
                <Lock className="text-slate-400" size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full p-4 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-4 text-white font-semibold"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
