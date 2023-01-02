import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styles from "../styles/Home.module.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { apiClient } from "../lib/httpClient";
import TextInputComponent from "../components/control/TextInputComponent";
import { Snackbar, Stack } from "@mui/material";
import { Action } from "../components/SnackbarAction";
import { SignInResponseDto } from "../lib/interface";
import { setAuthState } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

// function Copyright(props: any) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const theme = createTheme();

interface SignInDto {
  email: string;
  password: string;
}

export default function SignIn() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = (data: SignInDto) => {
    setLoading(true);
    const url = "/auth/sign-in";
    const body = {
      email: data.email,
      password: data.password,
    };
    apiClient(process.env.NEXT_PUBLIC_API_URL)
      .post(url, { ...body })
      .then((data) => {
        const response = data.data?.data as SignInResponseDto;
        console.log("response", response);
        const authData = {
          isAuthenticated: true,
          accessToken: response.accessToken,
          email: response.profile.email,
          userName: response.profile.userName,
        };
        dispatch(setAuthState(authData));
        void window.localStorage.setItem("auth", JSON.stringify(authData));
        setLoading(false);
        router.push("/");
      })
      .catch((error) => {
        setLoading(false);
        setShowMessage(true);
        setMessage(error.response.data.message || "");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <main className={styles.main}>
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="div" sx={{ mt: 3, width: "100%" }}>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  phone: "",
                  type: "",
                  message: "",
                }}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values, { resetForm }) => {
                  handleSubmit(values as unknown as SignInDto);
                  resetForm();
                }}
              >
                <Form>
                  <Grid container>
                    <Grid item md={12} xs={12}>
                      <Stack
                        direction="column"
                        spacing={2}
                        my={2}
                        justifyContent="flex-start"
                      >
                        <TextInputComponent
                          label="Email Address"
                          placeholder="Enter Email"
                          name="email"
                        />
                        <TextInputComponent
                          name="password"
                          placeholder="Enter Password"
                          label="Password"
                          type="password"
                          autoComplete="new-password"
                        />
                        <Button
                          variant="contained"
                          type="submit"
                          fullWidth
                          disabled={isLoading}
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Sign In
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Box>
          </Box>
          <Snackbar
            color="error"
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={5000}
            action={<Action handleClose={() => setShowMessage(false)} />}
            open={showMessage}
            onClose={() => setShowMessage(false)}
            message={message}
          />
        </Container>
      </main>
    </ThemeProvider>
  );
}
