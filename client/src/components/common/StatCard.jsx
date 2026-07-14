import AnimatedNumber from "./AnimatedNumber";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "bg-[#134080]",
  change,
  prefix = "",
  suffix = "",
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2">
            <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
          </h2>

          {change && <p className="text-green-600 text-sm mt-2">{change}</p>}
        </div>

        <div className={`${color} p-3 rounded-xl`}>
          <Icon className="text-white" size={26} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
