import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Lock } from "lucide-react";
import farmImage from "../assets/farming.png";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import { useAuth } from "../auth";


const Register = () => {
  const navigate = useNavigate();
  const { register: createAccount } = useAuth();
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ name, email, password }) => {
    setServerError("");
    setIsSubmitting(true);
    try {
      await createAccount({ name, email, password });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Start your smart farming journey with AgroAI"
      image={farmImage}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2"
      >
        {serverError && <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{serverError}</p>}
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
          placeholder="Create a password"
          icon={Lock}
          register={register}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          error={errors.password}
        />

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
              value === getValues("password") || "Passwords do not match",
          }}
          error={errors.confirmPassword}
        />

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
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>

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
