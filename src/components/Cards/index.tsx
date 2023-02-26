import { useQuery } from "@apollo/client";
import { Fragment } from "react";
import { getCards } from "../../gql/getCards";
import { useAppSelector } from "../../store/hooks";
import { currentUserSelector, CurrentUser } from "../../store/slices/authSlice";
import PageHeading from "../common/PageHeading";
import { CardList } from "./CardList";

function Cards() {
  const currentUser: CurrentUser = useAppSelector(currentUserSelector);

  const { loading, error, data } = useQuery(getCards, {
    variables: { userName: currentUser.userName },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  return (
    <Fragment>
      <PageHeading>Cards</PageHeading>
      <CardList cards={data.users[0].cards} />
    </Fragment>
  );
}

export default Cards;
