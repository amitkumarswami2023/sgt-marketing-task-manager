import { UserCircle2 } from "lucide-react";

const ProfileHeader = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow p-8 flex items-center gap-6">
      <div className="w-24 h-24 rounded-full bg-[#134080] flex items-center justify-center text-white">
        <UserCircle2 size={70} />
      </div>

      <div>
        <h1 className="text-3xl font-bold">{user?.name}</h1>

        <p className="text-lg text-gray-500 mt-1">{user?.designation}</p>

        <span className="inline-block mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Active
        </span>
      </div>
    </div>
  );
};

export default ProfileHeader;
