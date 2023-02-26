import { useQuery } from "@apollo/client";
import { Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccounts } from "../../gql/getAccounts";
import { useAppSelector } from "../../store/hooks";
import { currentUserSelector, CurrentUser } from "../../store/slices/authSlice";
import PageHeading from "../common/PageHeading";
import { AccountList } from "./AccountList";

function Accounts() {
  const currentUser: CurrentUser = useAppSelector(currentUserSelector);

  const { loading, error, data } = useQuery(getAccounts, {
    variables: { userName: currentUser.userName },
  });
  const [searchParams] = useSearchParams();
  const expandedIndex = searchParams.get("i") || 0;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  return (
    <Fragment>
      <PageHeading>Accounts</PageHeading>
      <AccountList
        accounts={data.users[0].accounts}
        expandedIndex={+expandedIndex!}
      />
    </Fragment>
  );
}

export default Accounts;
