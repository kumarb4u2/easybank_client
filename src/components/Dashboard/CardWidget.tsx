import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useState } from "react";
import { Card } from "../../types/card.type";
import ApplyCard from "../Cards/ApplyCard";
import { CardList } from "../Cards/CardList";
import { cardDetails } from "./content";
import TransitionsModal from "./Modal";
import OutlinedCard from "./OutlinedCard";
import OutstandingCardBill from "./OutstandingCardBill";

type Props = {
  cards: Card[];
};

function CardWidget({ cards }: Props) {
  const [open, setOpen] = useState(false);

  const onOpenAccount = () => {
    setOpen(true);
  };
  return (
    <div>
      {cards.length > 0 ? (
        <Fragment>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Card details
          </Typography>
          <CardList cards={cards} />
          <Button
            variant="contained"
            onClick={onOpenAccount}
            sx={{ textTransform: "capitalize", marginTop: 5 }}
          >
            Apply for another card
          </Button>
          <Box sx={{ marginTop: 4 }}>
            <OutstandingCardBill />
          </Box>
        </Fragment>
      ) : (
        <OutlinedCard info={{ ...cardDetails, handleAction: onOpenAccount }} />
      )}
      <TransitionsModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      >
        <ApplyCard />
      </TransitionsModal>
    </div>
  );
}

export default CardWidget;
