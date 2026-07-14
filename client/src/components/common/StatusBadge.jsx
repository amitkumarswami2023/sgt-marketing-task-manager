import Badge from "./Badge";

const StatusBadge = ({ status }) => {
  const colors = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    "On Hold": "bg-red-100 text-red-700",
  };

  return (
    <Badge
      text={status}
      color={colors[status] || "bg-gray-100 text-gray-700"}
    />
  );
};

export default StatusBadge;
