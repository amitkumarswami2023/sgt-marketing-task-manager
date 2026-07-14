import { Bell, Search, CalendarDays, UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={18} />

          <input
            type="text"
            placeholder="Search..."
            className="w-80 pl-11 pr-4 py-3 rounded-xl border outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 border rounded-xl px-4 py-2">
          <CalendarDays size={18} />

          <span>Last 30 Days</span>
        </div>

        <Bell size={22} />

        <UserCircle size={34} />
      </div>
    </header>
  );
};

export default Navbar;
