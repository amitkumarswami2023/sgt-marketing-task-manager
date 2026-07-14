import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", traffic: 25000 },
  { month: "Feb", traffic: 32000 },
  { month: "Mar", traffic: 41000 },
  { month: "Apr", traffic: 36000 },
  { month: "May", traffic: 52000 },
  { month: "Jun", traffic: 61000 },
];

const TrafficChart = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="traffic"
          stroke="#134080"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrafficChart;
