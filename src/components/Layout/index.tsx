import { Container } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import {
  getNotificationSelector,
  NotificationState,
} from "../../store/slices/notificationSlice";
import Notification from "../common/Notification";

export const Layout = ({ children }: { children: any }) => {
  const notification: NotificationState = useAppSelector(
    getNotificationSelector
  );
  return (
    <Container maxWidth="lg" sx={{ marginTop: 5 }}>
      {notification.message && (
        <Notification notification={notification}></Notification>
      )}
      {children}
    </Container>
  );
};
