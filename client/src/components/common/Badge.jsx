const Badge = ({ text, color }) => {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      {text}
    </span>
  );
};

export default Badge;
