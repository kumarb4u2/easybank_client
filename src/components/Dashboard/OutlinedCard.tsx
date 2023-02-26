import { Fragment } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Collapsible from "../common/Collapsible";
import { Button } from "@mui/material";

type Account = {
  name: string;
  features: string[];
  additionalInfo: string;
};

type CardType = {
  heading: string;
  subHeading: string;
  accounts: Account[];
  actionLabel: string;
  handleAction: () => void;
};

const card = (info: CardType) => (
  <Fragment>
    <CardContent>
      <Typography
        variant="h5"
        sx={{ fontSize: 14 }}
        color="text.secondary"
        gutterBottom
      >
        {info.heading}
      </Typography>
      <Typography variant="body2">{info.subHeading}</Typography>
      {info.accounts.map((item) => (
        <div key={item.name}>
          <Collapsible data={item} />
        </div>
      ))}
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          onClick={info.handleAction}
          sx={{ textTransform: "capitalize" }}
        >
          {info.actionLabel}
        </Button>
      </Box>
    </CardContent>
  </Fragment>
);

export default function OutlinedCard({ info }: { info: CardType }) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card(info)}</Card>
    </Box>
  );
}
