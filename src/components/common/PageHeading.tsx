import { Typography } from "@mui/material";
import React from "react";

type Props = {
  children: any;
};

function PageHeading({ children }: Props) {
  return (
    <Typography
      variant="h1"
      gutterBottom
      sx={{
        marginTop: "20px",
        fontWeight: "bold",
        borderBottom: "4px solid #f44336",
        paddingBottom: 1,
        marginBottom: 4,
        fontSize: "36px",
        textTransform: "capitalize",
      }}
    >
      {children}
    </Typography>
  );
}

export default PageHeading;
