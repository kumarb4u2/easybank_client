import { useQuery } from "@apollo/client";
import { Fragment, useState } from "react";
import { getWelcomeModalStatus } from "../../gql/welcomeModalStatus";
import { useAppSelector } from "../../store/hooks";
import { currentUserSelector, CurrentUser } from "../../store/slices/authSlice";
import PageHeading from "../common/PageHeading";
import WelcomeModal from "../common/WelcomeModal";

import WidgetContainer from "./WidgetContainer";

function Home() {
  const currentUser: CurrentUser = useAppSelector(currentUserSelector);
  const [welcomeModal, setWelcomeModal] = useState(true);
  const { loading, data } = useQuery(getWelcomeModalStatus, {
    variables: { userName: currentUser.userName },
  });
  if (loading) return <p>Loading...</p>;
  return (
    <Fragment>
      {welcomeModal && data?.users[0]?.showWelcomeModal && (
        <WelcomeModal
          currentUser={currentUser}
          confirm={() => {
            setWelcomeModal(false);
          }}
        />
      )}
      <PageHeading>Welcome {currentUser.name}</PageHeading>
      <WidgetContainer />
    </Fragment>
  );
}

export default Home;
