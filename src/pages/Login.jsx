import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock } from "lucide-react";
import farmImage from "../assets/farming.png";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import { getLoggedInUser, loginUser } from "../auth";


const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (getLoggedInUser()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const onSubmit = (data) => {
    setLoginError("");

    if (!loginUser(data.email, data.password)) {
      setLoginError("No matching account found. Please register first or check your details.");
      return;
    }

    navigate("/dashboard", { replace: true });
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to continue to AgroAI"
      image={farmImage}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2"
      >
        {location.state?.message && (
          <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            {location.state.message}
          </p>
        )}

        {loginError && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {loginError}
          </p>
        )}

        {/* Email */}

        <AuthInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          icon={Mail}
          register={register}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email",
            },
          }}
          error={errors.email}
        />

        {/* Password */}

        <AuthInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          icon={Lock}
          register={register}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          error={errors.password}
        />

        {/* Remember */}

        <div className="flex justify-between items-center py-2">

          <label className="flex items-center gap-2 text-sm text-slate-600">

            <input
              type="checkbox"
              {...register("remember")}
              className="accent-green-600"
            />

            Remember Me

          </label>

          <Link
            to="/forgot-password"
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            Forgot Password?
          </Link>

        </div>

        {/* Login Button */}

        <button
          type="submit"
          className="
            w-full
            mt-4
            bg-green-600
            hover:bg-green-700
            text-white
            font-semibold
            py-3
            rounded-xl
            transition
            shadow-lg
          "
        >
          Login
        </button>

        {/* Divider */}

        <div className="flex items-center gap-4 my-6">

          <div className="flex-1 h-px bg-slate-300"></div>

          <span className="text-slate-400 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-slate-300"></div>

        </div>

        {/* Google */}

        <button
          type="button"
          className="
            w-full
            border
            border-slate-300
            rounded-xl
            py-3
            hover:bg-slate-100
            transition
          "
        >
          Continue with Google
        </button>

        {/* Register */}

        <p className="text-center text-slate-500 mt-8">

          Don't have an account?

          <Link
            to="/register"
            className="ml-2 text-green-600 font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </form>
    </AuthLayout>
  );
};

export default Login;