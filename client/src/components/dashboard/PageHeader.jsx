import { CalendarDays } from "lucide-react";

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
        <p className="text-slate-500 mt-1">{subtitle}</p>
      </div>

      <div className="mt-4 md:mt-0 flex items-center gap-2 bg-white border rounded-xl px-4 py-2 shadow-sm">
        <CalendarDays size={18} className="text-blue-600" />
        <span className="text-sm font-medium">Last 30 Days</span>
      </div>
    </div>
  );
};

export default PageHeader;
