import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { logIn } from "../../gql/login";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setAuthSuccess } from "../../store/slices/authSlice";
import { setNotification } from "../../store/slices/notificationSlice";

const theme = createTheme();

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mutateFunction] = useMutation(logIn);

  const onSubmit = async (formValues: any) => {
    try {
      const resp = await mutateFunction({
        variables: { ...formValues },
      });
      dispatch(setAuthSuccess(resp.data.logIn));
      navigate("/dashboard");
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
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User name"
              autoComplete="email"
              autoFocus
              error={!!errors.userName}
              helperText={errors.userName && "User name is required."}
              {...register("userName", { required: true })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password && "Password is required."}
              {...register("password", { required: true })}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
