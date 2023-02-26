import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignIn from "./";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { logIn } from "../../gql/login";
import { GraphQLError } from "graphql";

const mockedUseNavigate = jest.fn();
const mockedUseHref = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
  useHref: () => mockedUseHref,
}));
store.dispatch = jest.fn();
describe("SignIn", () => {
  test("should render without error", async () => {
    const mocks: any[] = [];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <SignIn />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("Sign in")).toBeInTheDocument();
    });
  });

  test("should show the error message in case click on Sign in button without entering username and password", async () => {
    const mocks: any[] = [];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <SignIn />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    const button = await screen.findByText("Sign In");
    userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText("Password is required.")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("User name is required.")).toBeInTheDocument();
    });
  });

  test("should navigate to dashboard on sucessful login", async () => {
    const mocks: any[] = [
      {
        request: {
          query: logIn,
          variables: { userName: "kumla12", password: "pasword123" },
        },
        result: {
          data: {
            logIn: {
              userName: "kumla12",
              name: "kumar",
              email: "kumar@gmail.com",
              mobile: "8123123213",
              address: "106 richmond st se atlanta",
            },
          },
        },
      },
    ];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <SignIn />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    userEvent.type((await screen.findAllByRole("textbox"))[0], "kumla12");
    await waitFor(async () => {
      expect((await screen.findAllByRole("textbox"))[0]).toHaveValue("kumla12");
    });

    userEvent.type(screen.getByLabelText(/Password/), "pasword123");
    await waitFor(() => {
      expect(screen.getByLabelText(/Password/)).toHaveValue("pasword123");
    });

    const button = await screen.findByText("Sign In");
    userEvent.click(button);
    await waitFor(() => {
      expect(mockedUseNavigate).toBeCalledWith("/dashboard");
    });
  });

  test("should show error if login is not successs", async () => {
    const mocks: any[] = [
      {
        request: {
          query: logIn,
          variables: { userName: "kumla12", password: "pasword123" },
        },
        result: [new GraphQLError("Error!")],
      },
    ];
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <SignIn />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );
    userEvent.type((await screen.findAllByRole("textbox"))[0], "kumla12");
    expect((await screen.findAllByRole("textbox"))[0]).toHaveValue("kumla12");
    userEvent.type(screen.getByLabelText(/Password/), "pasword123");
    expect(screen.getByLabelText(/Password/)).toHaveValue("pasword123");
    const button = await screen.findByText("Sign In");
    userEvent.click(button);
    await waitFor(() => {
      expect(store.dispatch).toBeCalledTimes(0);
    });
  });
});
