import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

import { insights } from "../../data/dashboardData";

const iconMap = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: "text-green-600 bg-green-100",
  warning: "text-orange-600 bg-orange-100",
  info: "text-blue-600 bg-blue-100",
};

const RecentInsights = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-xl font-semibold">Recent Insights</h2>

      <p className="text-sm text-slate-500 mb-6">
        Important highlights from your marketing performance
      </p>

      <div className="space-y-4">
        {insights.map((item, index) => {
          const Icon = iconMap[item.type];

          return (
            <div
              key={index}
              className="flex items-start gap-4 border rounded-xl p-4 hover:bg-slate-50 transition"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[item.type]}`}
              >
                <Icon size={20} />
              </div>

              <div>
                <h3 className="font-semibold">{item.title}</h3>

                <p className="text-sm text-slate-500 mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentInsights;
