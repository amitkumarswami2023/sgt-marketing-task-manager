const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-semibold text-slate-800">{title}</h2>

      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;
