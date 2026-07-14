import { Mail, Briefcase, Building2, CheckCircle, Clock } from "lucide-react";

const TeamMemberCard = ({ member }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#134080] text-white flex items-center justify-center text-2xl font-bold">
          {member.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="text-lg font-bold">{member.name}</h2>

          <p className="text-gray-500">{member.designation}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <Mail size={16} />
          <span>{member.email}</span>
        </div>

        <div className="flex items-center gap-2">
          <Building2 size={16} />
          <span>{member.department}</span>
        </div>

        <div className="flex items-center gap-2">
          <Briefcase size={16} />
          <span className="capitalize">{member.role}</span>
        </div>
      </div>

      <div className="border-t mt-5 pt-4 flex justify-between">
        <div className="text-center">
          <CheckCircle className="text-green-600 mx-auto" size={20} />
          <p className="font-semibold">{member.completedTasks || 0}</p>
          <small className="text-gray-500">Completed</small>
        </div>

        <div className="text-center">
          <Clock className="text-yellow-500 mx-auto" size={20} />
          <p className="font-semibold">{member.pendingTasks || 0}</p>
          <small className="text-gray-500">Pending</small>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
