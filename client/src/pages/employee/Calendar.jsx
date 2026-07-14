import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TaskEventModal from "../../components/calendar/TaskEventModal";

import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../features/tasks/taskSlice";

const localizer = momentLocalizer(moment);

const EmployeeCalendar = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const events = tasks
    .filter((task) => task.dueDate)
    .map((task) => ({
      title: task.title,
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      allDay: true,
      resource: task,
    }));

  const eventStyleGetter = (event) => {
    const task = event.resource;

    let backgroundColor = "#134080";

    if (task.status === "Completed") backgroundColor = "#16a34a";
    else if (task.status === "Pending") backgroundColor = "#facc15";
    else if (task.status === "In Progress") backgroundColor = "#2563eb";
    else if (task.status === "On Hold") backgroundColor = "#ef4444";

    if (task.status !== "Completed" && new Date(task.dueDate) < new Date()) {
      backgroundColor = "#dc2626";
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "6px",
        color: "#fff",
        border: "none",
      },
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Task Calendar</h1>
        <p className="text-gray-500">View all your task deadlines.</p>
      </div>

      <div className="bg-white rounded-xl shadow p-5 h-[700px]">
        <div className="flex gap-6 mb-5 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-600"></div>
            Completed
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-600"></div>
            In Progress
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-400"></div>
            Pending
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-600"></div>
            Overdue
          </div>
        </div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          popup
          defaultView="month"
          views={["month", "week", "day", "agenda"]}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={(event) => {
            setSelectedTask(event.resource);
            setOpen(true);
          }}
        />
        <TaskEventModal
          open={open}
          task={selectedTask}
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
};

export default EmployeeCalendar;
