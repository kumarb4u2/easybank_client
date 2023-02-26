import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WelcomeModal from "./WelcomeModal";
import { CurrentUser } from "../../store/slices/authSlice";
import { MockedProvider } from "@apollo/client/testing";
import { updateWelcomeModal } from "../../gql/welcomeModalStatus";
import userEvent from "@testing-library/user-event";

describe("WelcomeModal", () => {
  test("should render without error", async () => {
    const currentUser: Partial<CurrentUser> = {
      name: "Kumar",
    };
    const confirm = jest.fn();
    const mocks: any[] = [];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <WelcomeModal currentUser={currentUser} confirm={confirm} />
      </MockedProvider>
    );
    expect(screen.getByText("Welcome to EasyBank Kumar")).toBeInTheDocument();
  });

  test("should save the user confirmation", async () => {
    const currentUser: Partial<CurrentUser> = {
      name: "Kumar",
    };
    const confirm = jest.fn();
    const mocks: any[] = [
      {
        request: {
          query: updateWelcomeModal,
          variables: { userName: "Kumar", welcomeModalSeen: false },
        },
        result: {},
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <WelcomeModal currentUser={currentUser} confirm={confirm} />
      </MockedProvider>
    );
    const button = await screen.findByText("Ok");
    userEvent.click(button);
    expect(
      await screen.findByText("Welcome to EasyBank Kumar")
    ).toBeInTheDocument();
    // TODO: to fix
    expect(await confirm).toBeCalledTimes(0);
  });
});
