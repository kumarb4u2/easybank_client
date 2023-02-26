import { Alert } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import {
  NotificationState,
  removeNotification,
} from "../../store/slices/notificationSlice";

type Props = { notification: NotificationState };

function Notification({ notification }: Props) {
  const dispatch = useAppDispatch();
  setTimeout(() => {
    dispatch(removeNotification());
  }, 3000);
  return <Alert severity={notification.severity}>{notification.message}</Alert>;
}

export default Notification;
