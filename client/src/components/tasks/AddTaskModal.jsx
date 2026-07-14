import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../../features/tasks/taskSlice";
import { toast } from "react-toastify";

const AddTaskModal = ({ open, onClose, editingTask }) => {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    title: "",
    description: "",
    department: "",
    assignedTo: "",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    if (!open || !user) return;

    fetchUsers();

    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description,
        department: editingTask.department,
        assignedTo: editingTask.assignedTo?._id,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate
          ? editingTask.dueDate.substring(0, 10)
          : "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        department: user.role === "admin" ? "" : user.department,

        assignedTo: user.role === "employee" ? user._id : "",

        priority: "Medium",
        dueDate: "",
      });
    }
  }, [open, editingTask, user]);

  console.log("AUTH USER FROM REDUX:", user);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");

      console.log("CURRENT USER:", user);
      console.log("USERS API:", data.users);

      if (data.success) {
        let filteredUsers = [];

        if (user.role === "admin") {
          filteredUsers = data.users.filter((u) => u.role !== "admin");
        } else if (user?.role === "team-lead") {
          filteredUsers = data.users.filter(
            (u) =>
              u._id !== user._id &&
              u.department?.trim().toLowerCase() ===
                user.department?.trim().toLowerCase(),
          );
        } else if (user.role === "employee") {
          filteredUsers = data.users.filter((u) => u._id === user._id);
        }

        console.log("FILTERED USERS:", filteredUsers);

        setUsers(filteredUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    let finalForm = { ...form };

    // Employee always assigns himself

    if (user?.role === "employee") {
      finalForm.assignedTo = user._id;

      finalForm.department = user.department;
    }

    // Team lead cannot change department

    if (user?.role === "team-lead") {
      finalForm.department = user.department;
    }

    let result;

    if (editingTask) {
      result = await dispatch(
        updateTask({
          id: editingTask._id,

          taskData: finalForm,
        }),
      );
    } else {
      result = await dispatch(createTask(finalForm));
    }

    if (result.meta.requestStatus === "fulfilled") {
      toast.success(
        editingTask ? "Task Updated Successfully" : "Task Created Successfully",
      );

      onClose();
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[700px] rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          {editingTask ? "Edit Task" : "Create Task"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Task Title"
            className="border rounded-lg p-3"
          />

          <textarea
            rows="4"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border rounded-lg p-3 col-span-2"
          />

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            disabled={user?.role === "team-lead" || user?.role === "employee"}
            className="border rounded-lg p-3"
          >
            <option value="">Select Department</option>

            <option>Web Development</option>

            <option>SEO</option>

            <option>Content</option>

            <option>Graphics</option>

            <option>CRM</option>

            <option>Communications</option>
          </select>

          <select
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
            disabled={user?.role === "employee"}
            className="border rounded-lg p-3"
          >
            <option value="">Assign User</option>

            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >
            <option>Low</option>

            <option>Medium</option>

            <option>High</option>

            <option>Urgent</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="border px-5 py-2 rounded-lg">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-[#134080] text-white px-5 py-2 rounded-lg"
          >
            {editingTask ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
