import { Button, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Account } from "../../types/account.type";
import { AccountList } from "../Accounts/AccountList";
import OpenAccount from "../Accounts/OpenAccount";
import { accountCard } from "./content";
import TransitionsModal from "./Modal";
import OutlinedCard from "./OutlinedCard";

type Props = {
  accounts: Account[];
};

function AccountWidget({ accounts }: Props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onOpenAccount = () => {
    setOpen(true);
  };
  const handleSeeMore = (index: number) => {
    navigate(`/accounts?i=${index}`);
  };
  return (
    <div>
      {accounts.length > 0 ? (
        <Fragment>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Account details
          </Typography>
          <AccountList
            accounts={accounts}
            handleSeeMore={handleSeeMore}
            expandedIndex={0}
          />
          <Button
            variant="contained"
            onClick={onOpenAccount}
            sx={{ textTransform: "capitalize", marginTop: 5 }}
          >
            Open another account
          </Button>
        </Fragment>
      ) : (
        <OutlinedCard info={{ ...accountCard, handleAction: onOpenAccount }} />
      )}
      <TransitionsModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      >
        <OpenAccount />
      </TransitionsModal>
    </div>
  );
}

export default AccountWidget;
