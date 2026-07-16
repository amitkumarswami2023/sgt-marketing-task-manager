import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  deleteTask,
  updateTaskStatus,
} from "../../features/tasks/taskSlice";
import AddTaskModal from "../../components/tasks/AddTaskModal";
import TaskTable from "../../components/tasks/TaskTable";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { toast } from "react-toastify";
import TaskStats from "../../components/tasks/TaskStats";
import DeliverableModal from "../../components/tasks/DeliverableModal";
const Tasks = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDeliverables, setOpenDeliverables] = useState(false);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Later we'll replace this with Redux
  const { tasks, loading } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.department.toLowerCase().includes(search.toLowerCase()) ||
      task.assignedTo?.name?.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" || task.department === departmentFilter;

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  const handleDelete = (task) => {
    setSelectedTask(task);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    const result = await dispatch(deleteTask(selectedTask._id));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Task Deleted");
    } else {
      toast.error("Unable to delete task");
    }

    setDeleteOpen(false);
    setSelectedTask(null);
  };

  const handleStatusChange = async (id, status) => {
    let progress = 0;

    if (status === "Pending") progress = 0;

    if (status === "In Progress") progress = 50;

    if (status === "Completed") progress = 100;

    if (status === "On Hold") progress = 50;

    const result = await dispatch(
      updateTaskStatus({
        id,
        status,
        progress,
      }),
    );

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Task Updated");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <p className="text-gray-500">Manage all department tasks</p>
        </div>

        <button
          onClick={() => {
            setEditingTask(null);
            setOpen(true);
          }}
          className="bg-[#134080] hover:bg-[#0d2d5d] text-white px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Create Task
        </button>
      </div>

      <TaskStats tasks={tasks} />

      <div className="bg-white rounded-xl shadow p-5">
        <div className="flex gap-4 mb-5">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />

            <input
              placeholder="Search Tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg w-full py-3 pl-10"
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="border rounded-lg px-4"
          >
            <option value="All">All Departments</option>

            <option value="Web Development">Web Development</option>

            <option value="SEO">SEO</option>

            <option value="Content">Content</option>

            <option value="Graphics">Graphics</option>
            <option value="Communications">Communications</option>

            <option value="CRM">CRM</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-4"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        <TaskTable
          tasks={filteredTasks}
          user={user}
          onView={(task) => {
            setSelectedTask(task);
            setOpenDeliverables(true);
          }}
          onEdit={(task) => {
            setEditingTask(task);
            setOpen(true);
          }}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </div>

      <AddTaskModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingTask(null);
        }}
        editingTask={editingTask}
      />

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        onCancel={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
      <DeliverableModal
        open={openDeliverables}
        onClose={() => setOpenDeliverables(false)}
        task={selectedTask}
      />
    </div>
  );
};

export default Tasks;
