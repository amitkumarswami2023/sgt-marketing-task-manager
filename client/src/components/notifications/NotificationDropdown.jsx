import { useDispatch, useSelector } from "react-redux";
import {
  markNotificationRead,
  markAllNotificationsRead,
} from "../../features/notifications/notificationSlice";
import { formatDistanceToNow } from "date-fns";

const NotificationDropdown = ({ onClose }) => {
  const dispatch = useDispatch();

  const { notifications } = useSelector((state) => state.notifications);

  const handleRead = (id) => {
    dispatch(markNotificationRead(id));

    if (onClose) {
      onClose();
    }
  };

  const handleReadAll = () => {
    dispatch(markAllNotificationsRead());
  };

  return (
    <div className="absolute right-0 top-14 w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b bg-white">
        <h2 className="font-semibold text-lg">Notifications</h2>

        {notifications.length > 0 && (
          <button
            onClick={handleReadAll}
            className="text-sm text-[#134080] hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div className="max-h-[450px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No Notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              onClick={() => handleRead(notification._id)}
              className={`cursor-pointer border-b p-4 transition hover:bg-slate-50 ${
                !notification.isRead ? "bg-blue-50" : "bg-white"
              }`}
            >
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">
                    {notification.title}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>

                {!notification.isRead && (
                  <span className="mt-2 w-3 h-3 rounded-full bg-blue-600 flex-shrink-0"></span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
