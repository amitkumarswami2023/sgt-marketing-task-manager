import Badge from "./Badge";

const PriorityBadge = ({ priority }) => {
  const colors = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-blue-100 text-blue-700",
    High: "bg-orange-100 text-orange-700",
    Urgent: "bg-red-100 text-red-700",
  };

  return (
    <Badge
      text={priority}
      color={colors[priority] || "bg-gray-100 text-gray-700"}
    />
  );
};

export default PriorityBadge;
