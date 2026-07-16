import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useDispatch } from "react-redux";
import { createTask, updateTask } from "../../features/tasks/taskSlice";
import { toast } from "react-toastify";

const initialForm = {
  title: "",
  description: "",
  department: "",
  assignedTo: "",
  priority: "Medium",
  dueDate: "",
};

const AddTaskModal = ({ open, onClose, editingTask }) => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) return;

    fetchUsers();

    if (editingTask) {
      setForm({
        title: editingTask.title || "",
        description: editingTask.description || "",
        department: editingTask.department || "",
        assignedTo: editingTask.assignedTo?._id || "",
        priority: editingTask.priority || "Medium",
        dueDate: editingTask.dueDate
          ? editingTask.dueDate.substring(0, 10)
          : "",
      });
    } else {
      setForm(initialForm);
    }
  }, [open, editingTask]);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");

      if (data.success) {
        const filteredUsers = data.users
          .filter((u) => u.role !== "admin")
          .sort((a, b) => {
            if (a.department === b.department) {
              return a.name.localeCompare(b.name);
            }

            return a.department.localeCompare(b.department);
          });

        setUsers(filteredUsers);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to load users");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAssignUser = (e) => {
    const selectedUser = users.find((u) => u._id === e.target.value);

    setForm((prev) => ({
      ...prev,
      assignedTo: e.target.value,
      department: selectedUser?.department || "",
    }));
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    if (!form.assignedTo) {
      toast.error("Please select a user");
      return;
    }

    setSaving(true);

    let result;

    if (editingTask) {
      result = await dispatch(
        updateTask({
          id: editingTask._id,
          taskData: form,
        }),
      );
    } else {
      result = await dispatch(createTask(form));
    }

    setSaving(false);

    if (result.meta.requestStatus === "fulfilled") {
      toast.success(
        editingTask ? "Task Updated Successfully" : "Task Created Successfully",
      );

      setForm(initialForm);
      onClose();
    } else {
      toast.error(result.payload || "Something went wrong");
    }
  };

  if (!open) return null;

  const departments = [...new Set(users.map((u) => u.department))].sort();

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl w-[720px] max-w-[95%] p-6">
        <h2 className="text-2xl font-bold mb-6">
          {editingTask ? "Edit Task" : "Create Task"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Task Title"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-[#134080] outline-none"
          />

          <input
            type="text"
            value={form.department}
            readOnly
            placeholder="Department"
            className="border rounded-lg p-3 bg-gray-100"
          />

          <textarea
            rows="4"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Task Description"
            className="border rounded-lg p-3 col-span-2 resize-none focus:ring-2 focus:ring-[#134080] outline-none"
          />

          <select
            value={form.assignedTo}
            onChange={handleAssignUser}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-[#134080] outline-none"
          >
            <option value="">Assign User</option>

            {departments.map((dept) => (
              <optgroup key={dept} label={dept}>
                {users
                  .filter((u) => u.department === dept)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name} ({u.designation})
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-[#134080] outline-none"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-[#134080] outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={() => {
              setForm(initialForm);
              onClose();
            }}
            className="border rounded-lg px-6 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={handleSubmit}
            className="bg-[#134080] hover:bg-[#0d2f63] disabled:opacity-60 text-white rounded-lg px-6 py-2 transition"
          >
            {saving ? "Saving..." : editingTask ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
