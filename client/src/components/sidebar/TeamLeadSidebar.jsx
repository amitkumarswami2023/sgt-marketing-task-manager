import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart3,
  User,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const menuItems = [
  {
    title: "Dashboard",
    path: "/teamlead",
    icon: LayoutDashboard,
  },
  {
    title: "Team Tasks",
    path: "/teamlead/tasks",
    icon: ClipboardList,
  },
  {
    title: "Team Members",
    path: "/teamlead/members",
    icon: Users,
  },
  {
    title: "Reports",
    path: "/teamlead/reports",
    icon: BarChart3,
  },
  {
    title: "Profile",
    path: "/teamlead/profile",
    icon: User,
  },
];

const TeamLeadSidebar = () => {
  const dispatch = useDispatch();

  return (
    <aside className="bg-slate-900 text-white h-full flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">MCC</h1>

        <p className="text-sm text-slate-400">Team Lead Dashboard</p>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 ${
                  isActive ? "bg-[#134080]" : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              {item.title}
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={() => dispatch(logout())}
        className="m-4 bg-red-600 rounded-xl py-3 flex justify-center items-center gap-2"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default TeamLeadSidebar;
