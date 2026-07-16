import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDeliverable } from "../../features/tasks/taskSlice";
import { toast } from "react-toastify";

const DeliverableModal = ({ open, onClose, task }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    title: "",
    url: "",
  });

  if (!open || !task) return null;

  const handleSubmit = async () => {
    if (!form.title || !form.url) {
      toast.error("Please fill all fields");
      return;
    }

    const result = await dispatch(
      addDeliverable({
        id: task._id,
        deliverable: form,
      }),
    );

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Deliverable submitted successfully");

      setForm({
        title: "",
        url: "",
      });

      onClose();
    } else {
      toast.error(result.payload || "Unable to submit deliverable");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl w-[700px] max-h-[85vh] overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Deliverables</h2>

            <p className="text-gray-500 text-sm mt-1">{task.title}</p>
          </div>

          <button onClick={onClose} className="text-2xl">
            ×
          </button>
        </div>

        {/* Existing Deliverables */}

        <div className="space-y-3">
          {task.deliverables?.length > 0 ? (
            task.deliverables.map((item, index) => (
              <div key={index} className="border rounded-xl p-4">
                <h3 className="font-semibold">{item.title}</h3>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {item.url}
                </a>

                <p className="text-sm text-gray-500 mt-2">
                  Submitted by <strong>{item.addedBy?.name || "User"}</strong>
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(item.addedAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-6">
              No deliverables submitted yet.
            </div>
          )}
        </div>

        {/* Add Deliverable */}

        {task.assignedTo?._id === user._id && (
          <div className="border-t mt-8 pt-6">
            <h3 className="font-semibold mb-4">Submit Deliverable</h3>

            <input
              type="text"
              placeholder="Deliverable Title"
              className="w-full border rounded-lg p-3 mb-4"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />

            <input
              type="url"
              placeholder="https://..."
              className="w-full border rounded-lg p-3"
              value={form.url}
              onChange={(e) =>
                setForm({
                  ...form,
                  url: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-3 mt-5">
              <button onClick={onClose} className="border rounded-lg px-5 py-2">
                Close
              </button>

              <button
                onClick={handleSubmit}
                className="bg-[#134080] text-white rounded-lg px-5 py-2"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliverableModal;
