import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function OutstandingCardBill() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 200 }}
        image="https://www.visa.co.in/dam/VCOM/regional/ap/india/global-elements/images/in-visa-classic-card-498x280.png"
        title="green iguana"
      />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
          INR 5235.00
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          Minimum payment INR 2000
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ color: "red" }}
        >
          Due in 2 days
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
      <CardActions sx={{ paddingLeft: 2 }}>
        <Button size="medium" variant="outlined" sx={{ fontWeight: "bold" }}>
          Pay now
        </Button>
      </CardActions>
    </Card>
  );
}
