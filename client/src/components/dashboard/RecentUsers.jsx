import { User, Briefcase } from "lucide-react";

const roleColors = {
  admin: "bg-red-100 text-red-700",
  "team-lead": "bg-blue-100 text-blue-700",
  employee: "bg-green-100 text-green-700",
};

const RecentUsers = ({ users = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-5">Recent Users</h2>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="border rounded-lg p-4 hover:bg-slate-50 transition"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <User size={16} />
                    {user.name}
                  </h3>

                  <p className="text-sm text-gray-500">{user.email}</p>

                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Briefcase size={14} />
                    {user.department || "Administration"}
                  </p>
                </div>

                <span
                  className={`h-fit px-3 py-1 rounded-full text-xs font-medium ${
                    roleColors[user.role]
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentUsers;
