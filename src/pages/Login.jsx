import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock } from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);

    // TODO:
    // axios.post("/api/login", data)
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to continue to AgroAI"
    //   image={farmImage}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2"
      >
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