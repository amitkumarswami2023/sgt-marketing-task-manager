import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../sidebar/EmployeeSidebar";
import Navbar from "./Navbar";

const EmployeeLayout = () => {
  return (
    <div className="flex h-screen bg-slate-100">
      <div className="w-72 fixed left-0 top-0 h-screen">
        <EmployeeSidebar />
      </div>

      <div className="flex-1 ml-72 flex flex-col">
        <Navbar />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
