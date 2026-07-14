import {
  TrendingUp,
  TrendingDown,
  CircleDollarSign,
  Users,
  GraduationCap,
  Target,
} from "lucide-react";

const ExecutiveSummary = () => {
  const items = [
    {
      title: "Marketing Spend",
      value: "₹15.4 L",
      change: "+12%",
      positive: true,
      icon: CircleDollarSign,
    },
    {
      title: "Leads",
      value: "2,584",
      change: "+18%",
      positive: true,
      icon: Users,
    },
    {
      title: "Admissions",
      value: "689",
      change: "+9%",
      positive: true,
      icon: GraduationCap,
    },
    {
      title: "Cost / Admission",
      value: "₹1,807",
      change: "-8%",
      positive: true,
      icon: Target,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-800">
        Executive Summary
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Overall marketing performance for the selected period.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="rounded-xl bg-slate-50 border p-4">
              <div className="flex justify-between items-center">
                <Icon className="text-[#134080]" size={22} />

                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
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

              <h3 className="text-3xl font-bold mt-5">{item.value}</h3>

              <p className="text-slate-500 mt-1">{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExecutiveSummary;
