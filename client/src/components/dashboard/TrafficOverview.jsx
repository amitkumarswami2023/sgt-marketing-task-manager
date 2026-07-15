import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { trafficData } from "../../data/dashboardData";

const TrafficOverview = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Website Traffic
          </h2>

          <p className="text-sm text-slate-500">Organic vs Paid Traffic</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={trafficData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="organic"
            stroke="#10B981"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="paid"
            stroke="#134080"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="direct"
            stroke="#FFA500"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficOverview;
