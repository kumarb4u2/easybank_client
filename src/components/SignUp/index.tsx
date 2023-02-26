import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { incomeList, occupationList } from "../../constants";
import { addUser } from "../../gql/addUser";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setNotification } from "../../store/slices/notificationSlice";

const theme = createTheme();

export default function SignUp() {
  const [occupation, setOccupation] = useState("");
  const [income, setIncome] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const [mutateFunction] = useMutation(addUser);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await mutateFunction({
        variables: { ...data },
      });
      dispatch(
        setNotification({
          message: "Sign up is success. Login to access your profile.",
          severity: "success",
        })
      );
      navigate("/login");
    } catch (error: any) {
      error.graphQLErrors.forEach((item: any) => {
        dispatch(setNotification({ message: item.message, severity: "error" }));
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  autoComplete="name"
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  error={!!errors.name}
                  helperText={errors.name && "Name is required."}
                  {...register("name", { required: true })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={!!errors.email && "Enter a valid email."}
                  {...register("email", {
                    required: true,
                    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  autoComplete="mobile"
                  error={!!errors.mobile}
                  inputProps={{
                    maxLength: 10,
                  }}
                  helperText={!!errors.mobile && "Enter a valid mobile."}
                  {...register("mobile", {
                    required: true,
                    pattern: /\d$/g,
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  autoComplete="address"
                  error={!!errors.address}
                  helperText={errors.address && "Address is required."}
                  {...register("address", { required: true })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  sx={{ minWidth: "100%" }}
                  size="small"
                  {...register("occupation", { required: true })}
                  error={!!errors.occupation}
                >
                  <InputLabel id="occupation">Occupation</InputLabel>
                  <Select
                    labelId="occupation"
                    id="occupation"
                    label="Occupation"
                    value={occupation}
                    onChange={(event) => {
                      setOccupation(event.target.value);
                      setValue("occupation", event.target.value);
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {occupationList.map((item) => (
                      <MenuItem value={item.value} key={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.occupation && (
                    <FormHelperText>Occupation is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  sx={{ minWidth: "100%" }}
                  size="small"
                  {...register("income", { required: true })}
                  error={!!errors.income}
                >
                  <InputLabel id="income">Income</InputLabel>
                  <Select
                    labelId="income"
                    id="income"
                    label="Income"
                    value={income}
                    onChange={(event) => {
                      setIncome(event.target.value);
                      setValue("income", event.target.value);
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {incomeList.map((item) => (
                      <MenuItem value={item.value} key={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.income && (
                    <FormHelperText>Income is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="idProofNumber"
                  label="Id number"
                  autoComplete="idProofNumber"
                  error={!!errors.idProofNumber}
                  helperText={errors.idProofNumber && "Id is required."}
                  {...register("idProofNumber", { required: true })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="userName"
                  label="User Id"
                  autoComplete="userName"
                  error={!!errors.userName}
                  helperText={errors.userName && "User id is required."}
                  {...register("userName", { required: true })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password && "Password is required."}
                  {...register("password", { required: true })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
