import { leadFunnel } from "../../data/dashboardData";
import { Globe, Users, FileText, GraduationCap } from "lucide-react";

const icons = [Globe, Users, FileText, GraduationCap];

const colors = [
  "bg-blue-600",
  "bg-green-600",
  "bg-orange-500",
  "bg-purple-600",
];

const LeadFunnel = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full">
      <h2 className="text-xl font-semibold text-slate-800">Admission Funnel</h2>

      <p className="text-sm text-slate-500 mb-6">
        Journey from website visitors to admissions
      </p>

      <div className="space-y-5">
        {leadFunnel.map((item, index) => {
          const Icon = icons[index];

          return (
            <div key={item.stage}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${colors[index]} flex items-center justify-center`}
                  >
                    <Icon size={20} className="text-white" />
                  </div>

                  <div>
                    <h3 className="font-semibold">{item.stage}</h3>

                    <p className="text-sm text-slate-500">
                      {item.value.toLocaleString()}
                    </p>
                  </div>
                </div>

                <span className="text-lg font-bold">
                  {item.value.toLocaleString()}
                </span>
              </div>

              {index !== leadFunnel.length - 1 && (
                <div className="ml-5 mt-3 mb-1 h-8 border-l-2 border-dashed border-slate-300"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadFunnel;
