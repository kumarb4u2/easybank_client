import { combineReducers } from "redux";
import { authSlice } from "./slices/authSlice";
import { NotificationSlice } from "./slices/notificationSlice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  notification: NotificationSlice.reducer,
});
