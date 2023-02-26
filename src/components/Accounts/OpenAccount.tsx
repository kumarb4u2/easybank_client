import { useMutation } from "@apollo/client";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccounts } from "../../gql/getAccounts";
import { openAccount } from "../../gql/openAccount";
import { useAppSelector } from "../../store/hooks";
import { currentUserSelector, CurrentUser } from "../../store/slices/authSlice";
import { RadioCardItem } from "../../types/RadioCardItem";
import RadioCard from "../common/RadioCard";
import { initialAccounts } from "./content";

const OpenAccount = () => {
  const [accounts, setAccounts] = useState<RadioCardItem[]>(initialAccounts);
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const currentUser: CurrentUser = useAppSelector(currentUserSelector);
  const navigate = useNavigate();
  const setRadioSelection = (selectedItem: RadioCardItem) => {
    setSelectedAccountType(selectedItem.type);
    setAccounts(
      accounts.map((item) => {
        item.selected = item.name === selectedItem.name;
        return item;
      })
    );
  };

  const [mutateFunction] = useMutation(openAccount, {
    refetchQueries: [{ query: getAccounts }, "getAccounts"],
  });

  const handleAccountOpening = async () => {
    await mutateFunction({
      variables: {
        userName: currentUser.userName,
        accountType: selectedAccountType,
      },
    });
    navigate("/accounts");
  };

  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          borderBottom: "1px solid black",
          paddingBottom: 1,
          marginBottom: 5,
        }}
      >
        Select an account:
      </Typography>
      <Grid container spacing={2}>
        {accounts.map((item) => (
          <Grid item xs={12} md={6} key={item.name}>
            <RadioCard item={item} handleRadioSelect={setRadioSelection} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleAccountOpening}
          disabled={!selectedAccountType}
        >
          Open
        </Button>
      </Box>
    </Box>
  );
};

export default OpenAccount;
