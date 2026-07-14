import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Fixed Sidebar */}
      <aside className="w-72 fixed left-0 top-0 h-screen">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-72 flex flex-col h-screen">
        {/* Fixed Navbar */}
        <div className="sticky top-0 z-30">
          <Navbar />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
