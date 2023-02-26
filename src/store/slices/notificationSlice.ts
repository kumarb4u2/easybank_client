import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationState {
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

export const initialState: NotificationState = {
  message: "",
  severity: "error",
};

export const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, { payload }: PayloadAction<NotificationState>) => {
      state.message = payload.message;
      state.severity = payload.severity;
    },
    removeNotification: (state) => {
      state.message = "";
    },
  },
});

export const { setNotification, removeNotification } =
  NotificationSlice.actions;

export const getNotificationSelector = (state: any): NotificationState => {
  return state.notification;
};
