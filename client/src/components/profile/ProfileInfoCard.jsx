import {
  Mail,
  Building2,
  Briefcase,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";

const Item = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 border rounded-lg">
    <div className="w-10 h-10 bg-[#134080]/10 rounded-lg flex items-center justify-center">
      <Icon className="text-[#134080]" size={20} />
    </div>

    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className="font-semibold">{value || "-"}</h3>
    </div>
  </div>
);

const ProfileInfoCard = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-6">Account Information</h2>

      <div className="grid md:grid-cols-2 gap-5">
        <Item icon={Mail} label="Email" value={user?.email} />

        <Item icon={ShieldCheck} label="Role" value={user?.role} />

        <Item icon={Building2} label="Department" value={user?.department} />

        <Item icon={Briefcase} label="Designation" value={user?.designation} />
      </div>
    </div>
  );
};

export default ProfileInfoCard;
