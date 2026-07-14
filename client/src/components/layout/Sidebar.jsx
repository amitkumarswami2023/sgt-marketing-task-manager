import {
  LayoutDashboard,
  ChartColumn,
  BadgeDollarSign,
  Megaphone,
  Users,
  Search,
  Share2,
  FileText,
  Settings,
  LogOut,
  UserCog,
  ClipboardList,
  UserCircle2,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Analytics",
    icon: ChartColumn,
    path: "/analytics",
  },
  {
    title: "Google Ads",
    icon: BadgeDollarSign,
    path: "/google-ads",
  },
  {
    title: "Meta Ads",
    icon: Megaphone,
    path: "/meta-ads",
  },
  {
    title: "Search Console",
    icon: Search,
    path: "/search-console",
  },
  {
    title: "CRM",
    icon: Users,
    path: "/crm",
  },
  {
    title: "Social Media",
    icon: Share2,
    path: "/social",
  },
  {
    title: "Reports",
    icon: FileText,
    path: "/reports",
  },
  {
    title: "Users",
    icon: UserCog,
    path: "/users",
  },
  {
    title: "Tasks",
    icon: ClipboardList,
    path: "/tasks",
  },
  {
    title: "Profile",
    icon: UserCircle2,
    path: "/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="bg-slate-900 text-white h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white">MCC</h1>
        <p className="text-sm text-slate-400">Marketing Command Center</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                  isActive
                    ? "bg-[#134080] text-white shadow-md"
                    : "text-white hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} className="flex-shrink-0" />

              <span className="font-medium">{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 rounded-xl py-3 flex items-center justify-center gap-2 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
