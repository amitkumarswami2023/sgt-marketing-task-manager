import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { leadSourceData } from "../../data/dashboardData";

const COLORS = ["#134080", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

const LeadSources = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full">
      <h2 className="text-xl font-semibold text-slate-800">Lead Sources</h2>

      <p className="text-sm text-slate-500 mb-5">
        Distribution of leads by marketing channel
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={leadSourceData}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {leadSourceData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeadSources;
