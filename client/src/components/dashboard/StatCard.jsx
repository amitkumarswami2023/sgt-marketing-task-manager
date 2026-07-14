const StatCard = ({ title, value, growth, color, icon: Icon }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>

          <h2 className="text-3xl font-bold mt-2">{value}</h2>

          <p className="text-green-600 text-sm mt-2">{growth}</p>
        </div>

        {Icon && (
          <div
            className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}
          >
            <Icon size={24} className="text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
