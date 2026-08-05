import { Sprout } from "lucide-react";

const AuthLayout = ({
  title,
  subtitle,
  children,
  image,
}) => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-5">

        {/* LEFT PANEL */}

        <div className="hidden lg:flex lg:col-span-2 bg-gradient-to-br from-[#002B1D] via-[#008C4A] to-[#00A2E8] text-white">

          <div className="flex flex-col justify-center w-full px-10 py-10">

            {/* Logo */}

            <div className="flex items-center gap-4 mb-10">

              <div className="bg-white p-3 rounded-2xl">
                <Sprout
                  size={30}
                  className="text-green-700"
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  AgroAI
                </h2>

                <p className="text-green-100">
                  Smart Irrigation Platform
                </p>
              </div>

            </div>

            {/* Heading */}

            <h1 className="text-4xl font-bold leading-tight">

              Empowering Farmers
              <br />
              with Artificial Intelligence

            </h1>

            <p className="mt-5 text-green-50 leading-7">

              AI-powered irrigation recommendations,
              weather forecasting,
              soil moisture insights,
              and smart farming analytics
              to increase crop productivity.

            </p>

            {/* Illustration */}

            <img
              src={image}
              alt="Smart Farming"
              className="h-56 object-contain mx-auto mt-10"
            />

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="lg:col-span-3 flex items-center justify-center">

          <div className="w-full max-w-md px-8 py-6 max-h-[90vh] overflow-y-auto">

            {/* Mobile Logo */}

            <div className="lg:hidden flex justify-center mb-8">

              <div className="bg-green-600 p-4 rounded-2xl">

                <Sprout
                  size={30}
                  className="text-white"
                />

              </div>

            </div>

            <h2 className="text-4xl font-bold text-slate-900">

              {title}

            </h2>

            <p className="text-slate-500 mt-2 mb-8">

              {subtitle}

            </p>

            {children}

          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthLayout;