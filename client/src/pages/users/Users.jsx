import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import AddUserModal from "../../components/users/AddUserModal";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../features/users/userSlice";
import DataTable from "../../components/common/DataTable";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { toast } from "react-toastify";
const Users = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { users, loading } = useSelector((state) => state.users);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.department.toLowerCase().includes(search.toLowerCase()) ||
      user.designation.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleEdit = (user) => {
    setEditingUser(user);
    setOpen(true);
  };
  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    const result = await dispatch(deleteUser(selectedUser._id));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("User Deleted");
    } else {
      toast.error("Unable to delete user");
    }

    setDeleteOpen(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      key: "name",
      title: "Name",
    },
    {
      key: "email",
      title: "Email",
    },
    {
      key: "department",
      title: "Department",
    },
    {
      key: "designation",
      title: "Designation",
    },
    {
      key: "role",
      title: "Role",
    },
    {
      key: "actions",
      title: "Actions",
      render: (user) => (
        <div className="flex gap-2">
          <button onClick={() => handleEdit(user)}>Edit</button>
          <button onClick={() => handleDelete(user)}>Delete</button>
        </div>
      ),
    },
  ];
  console.log("Search state:", search);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-gray-500">Manage department users</p>
        </div>

        <button
          onClick={() => {
            setEditingUser(null);
            setOpen(true);
          }}
          className="bg-[#134080] hover:bg-[#0d2d5d] text-white px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <div className="relative mb-5">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />

          <input
            type="search"
            name="user-search"
            autoComplete="off"
            className="border rounded-lg w-full pl-10 py-3"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <DataTable columns={columns} data={filteredUsers} loading={loading} />
      </div>

      <AddUserModal
        open={open}
        editingUser={editingUser}
        onClose={() => {
          setOpen(false);
          setEditingUser(null);
        }}
      />
      <ConfirmDialog
        open={deleteOpen}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        onCancel={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Users;
