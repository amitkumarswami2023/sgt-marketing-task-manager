import { useEffect, useState } from "react";
import api from "../../api/axios";
import TeamMemberCard from "../../components/teamlead/TeamMemberCard";
import TeamStats from "../../components/teamlead/TeamStats";
import { Search } from "lucide-react";

const TeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data } = await api.get("/users");

      if (data.success) {
        setMembers(data.users);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = members.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.designation?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Team Members</h1>

        <p className="text-gray-500">Your department employees</p>
      </div>

      <TeamStats members={members} />

      <div className="bg-white rounded-xl shadow p-5">
        <div className="relative mb-6">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search Team Member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg w-full py-3 pl-10"
          />
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((member) => (
            <TeamMemberCard key={member._id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
