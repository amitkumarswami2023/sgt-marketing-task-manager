import {
  TrendingUp,
  TrendingDown,
  CircleDollarSign,
  MousePointerClick,
  Eye,
  Target,
} from "lucide-react";

import { executiveSummary } from "../../data/dashboardData";

const icons = {
  spend: CircleDollarSign,
  impressions: Eye,
  clicks: MousePointerClick,
  conversions: Target,
};

const ExecutiveSummary = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-800">
        Executive Summary
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Google Ads Performance | March 2026 – June 29, 2026
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">
        {executiveSummary.map((item) => {
          const Icon = icons[item.icon];

          return (
            <div
              key={item.title}
              className="rounded-xl bg-slate-50 border border-slate-200 p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 rounded-xl bg-[#134080]/10 flex items-center justify-center">
                  <Icon className="text-[#134080]" size={24} />
                </div>

                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    item.positive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.positive ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}

                  {item.change}
                </div>
              </div>

              <h3 className="text-3xl font-bold text-slate-800 mt-6">
                {item.value}
              </h3>

              <p className="text-slate-500 mt-1">{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExecutiveSummary;
