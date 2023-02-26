import { setAuthSuccess, setLogOut } from "../slices/authSlice";

export const authMiddleware = (store:any) => (next:any) => (action:any) => {
    if (setAuthSuccess.match(action)) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    } else if (setLogOut.match(action)) {
      localStorage.setItem('isAuthenticated', 'false');
      localStorage.removeItem('currentUser');

    }
    return next(action);
  };