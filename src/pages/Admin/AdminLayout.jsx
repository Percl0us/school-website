import { Link, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  TrendingUp,
  Wallet,
  LogOut,
  ChevronRight,
  School,
  FileText,
  Brain,
  BookMarked,
  Settings,
  Calendar,
} from "lucide-react";

export default function AdminLayout() {
  const { admin, academicYear, logout } = useAdminAuth();
  const location = useLocation();

  const navItem = (to, label, Icon) => {
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        className={`group flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
            : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon
            size={18}
            className={
              isActive
                ? "text-white"
                : "text-slate-400 group-hover:text-blue-600"
            }
          />
          <span className="font-semibold text-sm">{label}</span>
        </div>
        {isActive && <ChevronRight size={14} />}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        {/* Branding */}
        <div className="p-6 border-b border-slate-50 flex items-center gap-3 text-blue-700">
          <div className="bg-blue-700 p-2 rounded-lg text-white">
            <School size={24} />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tight text-slate-800">
              Admin
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Tagore Public School
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">
              Main Menu
            </p>
            {navItem("/admin/dashboard", "Dashboard", LayoutDashboard)}
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">
              Students Management
            </p>
            {navItem("/admin/students", "All Students", Users)}
            {navItem("/admin/students/create", "Create Student", UserPlus)}
            {navItem("/admin/students/promote", "Promote Students", TrendingUp)}
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">
              Financials
            </p>
            {navItem("/admin/finance", "Finance Overview", Wallet)}
          </div>

          {/* Content Management section - now properly inside <nav> */}
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">
              Content Management
            </p>
            {navItem("/admin/notices", "Manage Notices", FileText)}
            {navItem("/admin/challenges", "Daily Challenges", Brain)}
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">
              Academics
            </p>
            {navItem("/admin/sessions", "Academic Sessions", Calendar)}
            {navItem("/admin/fee-structures", "Fee Structures", Settings)}
            {navItem("/admin/results", "Upload Marks", BookMarked)}
          </div>
        </nav>

        {/* User Profile / Session Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 m-4 rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm border-2 border-white shadow-sm">
              {admin?.name?.charAt(0) || "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">
                {admin?.name}
              </p>
              <p className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded inline-block">
                Session {academicYear}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header (Top Bar) */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
          <h2 className="text-slate-500 font-medium text-sm">
            Welcome back,{" "}
            <span className="text-slate-900 font-bold uppercase tracking-tight">
              {admin?.name}
            </span>
          </h2>

          <div className="flex items-center gap-4">
            <div className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase">
              Academic Session {academicYear}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}