import { Bell, Search, CalendarDays, UserCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import NotificationDropdown from "../notifications/NotificationDropdown";
import { getNotifications } from "../../features/notifications/notificationSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const [showNotifications, setShowNotifications] = useState(false);

  const notificationRef = useRef(null);

  const { unreadCount } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(getNotifications());

    const interval = setInterval(() => {
      dispatch(getNotifications());
    }, 20000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={18} />

          <input
            type="text"
            placeholder="Search..."
            className="w-80 pl-11 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[#134080]"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 border rounded-xl px-4 py-2">
          <CalendarDays size={18} />
          <span>Last 30 Days</span>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative p-2 rounded-full hover:bg-slate-100 transition"
          >
            <Bell size={22} />

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-600 text-white text-[11px] flex items-center justify-center font-semibold">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <NotificationDropdown onClose={() => setShowNotifications(false)} />
          )}
        </div>

        {/* User */}
        <button className="rounded-full hover:bg-slate-100 p-1 transition">
          <UserCircle size={34} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
