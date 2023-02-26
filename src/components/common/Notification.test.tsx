import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Notification from "./Notification";
import { NotificationState } from "../../store/slices/notificationSlice";
import { Provider } from "react-redux";
import { store } from "../../store";

describe("Notification", () => {
  test("should render error Notification", async () => {
    const data: NotificationState = {
      message: "Something went wrong",
      severity: "error",
    };
    render(
      <Provider store={store}>
        <Notification notification={data} />
      </Provider>
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
    expect(screen.getByTestId("ErrorOutlineIcon")).toBeInTheDocument();
  });

  test("should render success Notification", async () => {
    const data: NotificationState = {
      message: "Process is sucessful.",
      severity: "success",
    };
    render(
      <Provider store={store}>
        <Notification notification={data} />
      </Provider>
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Process is sucessful."
    );
    expect(screen.getByTestId("SuccessOutlinedIcon")).toBeInTheDocument();
  });
});
