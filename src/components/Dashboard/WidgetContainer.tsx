import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { getCardsAndAccounts } from "../../gql/getCardsAndAccounts";
import { useAppSelector } from "../../store/hooks";
import { CurrentUser, currentUserSelector } from "../../store/slices/authSlice";
import AccountWidget from "./AccountWidget";
import CardWidget from "./CardWidget";

function WidgetContainer() {
  const currentUser: CurrentUser = useAppSelector(currentUserSelector);

  const { loading, error, data } = useQuery(getCardsAndAccounts, {
    variables: { userName: currentUser.userName },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <AccountWidget accounts={data.users[0].accounts} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardWidget cards={data.users[0].cards} />
        </Grid>
      </Grid>
    </div>
  );
}

export default WidgetContainer;
