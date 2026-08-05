import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User, Mail, Lock } from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";


const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Register Data:", data);

    // TODO:
    // axios.post("/api/register", data)
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Start your smart farming journey with AgroAI"
    //   image={farmImage}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2"
      >
        {/* Full Name */}

        <AuthInput
          label="Full Name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          icon={User}
          register={register}
          rules={{
            required: "Full name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          }}
          error={errors.name}
        />

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
          placeholder="Create a password"
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

        {/* Confirm Password */}

        <AuthInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          icon={Lock}
          register={register}
          rules={{
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          }}
          error={errors.confirmPassword}
        />

        {/* Terms */}

        <div className="flex items-start gap-3 py-2">
          <input
            type="checkbox"
            id="terms"
            {...register("terms", {
              required: "You must accept the Terms & Conditions",
            })}
            className="mt-1 accent-green-600"
          />

          <label
            htmlFor="terms"
            className="text-sm text-slate-600"
          >
            I agree to the{" "}
            <span className="text-green-600 font-medium cursor-pointer hover:underline">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="text-green-600 font-medium cursor-pointer hover:underline">
              Privacy Policy
            </span>
          </label>
        </div>

        {errors.terms && (
          <p className="text-sm text-red-500">
            {errors.terms.message}
          </p>
        )}

        {/* Register Button */}

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
          Create Account
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

        {/* Login */}

        <p className="text-center text-slate-500 mt-8">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-green-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;