const ProgressBar = ({ progress }) => {
  return (
    <div className="w-32">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-2 bg-[#134080]" style={{ width: `${progress}%` }} />
      </div>

      <p className="text-xs mt-1 text-gray-600">{progress}%</p>
    </div>
  );
};

export default ProgressBar;
