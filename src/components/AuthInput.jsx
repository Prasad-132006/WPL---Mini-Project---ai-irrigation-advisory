import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const AuthInput = ({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  register,
  name,
  rules,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="mb-6">

      {/* Label */}

      <label
        htmlFor={name}
        className="block mb-2 text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      {/* Input */}

      <div className="relative">

        {/* Left Icon */}

        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={20} />
          </div>
        )}

        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          {...register(name, rules)}
          className={`
            w-full
            rounded-xl
            border
            py-3
            pl-12
            pr-12
            outline-none
            transition
            ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-slate-300 focus:border-green-600 focus:ring-2 focus:ring-green-200"
            }
          `}
        />

        {/* Password Toggle */}

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-green-600"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}

      </div>

      {/* Error */}

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error.message}
        </p>
      )}

    </div>
  );
};

export default AuthInput;