import { Link, useNavigate } from "react-router-dom";
import { LogOut, Sprout } from "lucide-react";
import DashboardWorkspace from "../components/DashboardWorkspace";
import { useAuth } from "../auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="rounded-xl bg-green-600 p-2.5 text-white"><Sprout size={24} /></div>
            <div>
              <h1 className="text-2xl font-bold leading-none text-[#002B1D]">AgroAI</h1>
              <p className="mt-1 text-xs text-slate-500">Smart Irrigation Dashboard</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-slate-600 sm:inline">Welcome, {user?.name}</span>
            <button type="button" onClick={handleLogout} className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600">
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16"><DashboardWorkspace /></main>
    </div>
  );
};

export default Dashboard;
