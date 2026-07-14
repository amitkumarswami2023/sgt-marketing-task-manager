import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "../../features/users/userSlice";

const AddUserModal = ({ open, onClose, editingUser }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    designation: "",
    role: "employee",
  });

  useEffect(() => {
    if (editingUser) {
      setForm({
        name: editingUser.name || "",
        email: editingUser.email || "",
        password: "",
        department: editingUser.department || "",
        designation: editingUser.designation || "",
        role: editingUser.role || "employee",
      });
    } else {
      setForm({
        name: "",
        email: "",
        password: "",
        department: "",
        designation: "",
        role: "employee",
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    let result;

    if (editingUser) {
      result = await dispatch(
        updateUser({
          id: editingUser._id,
          userData: form,
        }),
      );
    } else {
      result = await dispatch(createUser(form));
    }

    if (result.meta.requestStatus === "fulfilled") {
      toast.success(
        editingUser ? "User Updated Successfully" : "User Created Successfully",
      );

      onClose();

      setForm({
        name: "",
        email: "",
        password: "",
        department: "",
        designation: "",
        role: "employee",
      });
    } else {
      toast.error("Something went wrong");
    }
  };
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[600px] p-6">
        <h2 className="text-2xl font-bold mb-6">
          {editingUser ? "Edit User" : "Add User"}
        </h2>
        <form autoComplete="off">
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Name"
              className="border rounded-lg p-3"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              placeholder="Email"
              className="border rounded-lg p-3"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder={
                editingUser
                  ? "Leave blank to keep current password"
                  : "Password"
              }
              className="border rounded-lg p-3"
              name="password"
              value={form.password}
              onChange={handleChange}
            />

            <select
              className="border rounded-lg p-3"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="employee">Employee</option>

              <option value="team-lead">Team Lead</option>

              <option value="admin">Admin</option>
            </select>

            <select
              className="border rounded-lg p-3"
              name="department"
              value={form.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="Web Development">Web Development</option>
              <option value="SEO">SEO</option>
              <option value="Content">Content</option>
              <option value="Graphics">Graphics</option>
              <option value="CRM">CRM</option>
              <option value="Communications">Communications</option>
            </select>

            <input
              placeholder="Designation"
              className="border rounded-lg p-3"
              name="designation"
              value={form.designation}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button onClick={onClose} className="border px-5 py-2 rounded-lg">
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="bg-[#134080] text-white px-5 py-2 rounded-lg"
            >
              {editingUser ? "Edit User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
