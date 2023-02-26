import { Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useAppSelector } from "../../store/hooks";
import { currentUserSelector } from "../../store/slices/authSlice";
import PageHeading from "../common/PageHeading";

function Profile() {
  const currentUser: any = useAppSelector(currentUserSelector);
  const keyList = ["name", "email", "mobile", "address"];
  return (
    <Fragment>
      <PageHeading>Profile</PageHeading>
      {keyList.map((item: string) => (
        <Grid container spacing={2} marginBottom={3} key={item}>
          <Grid item xs={4}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ textTransform: "capitalize" }}
            >
              {item}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5">{currentUser[item]}</Typography>
          </Grid>
        </Grid>
      ))}
    </Fragment>
  );
}

export default Profile;
