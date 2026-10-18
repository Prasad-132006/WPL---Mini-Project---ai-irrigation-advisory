import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock } from "lucide-react";
import farmImage from "../assets/farming.png";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import { useAuth } from "../auth";


const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, loading, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [loading, navigate, user]);

  const onSubmit = async (data) => {
    setLoginError("");
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsSubmitting(false);
    }
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

        <div className="flex justify-between items-center py-2">

          <label className="flex items-center gap-2 text-sm text-slate-600">

            <input
              type="checkbox"
              {...register("remember")}
              className="accent-green-600"
            />

            Remember Me

          </label>

          <span className="text-xs text-slate-400">Secure server session</span>

        </div>

        <button
          type="submit"
          disabled={isSubmitting}
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
          {isSubmitting ? "Signing in..." : "Login"}
        </button>

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
