import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
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
import { Stack } from "@mui/system";
import { Snackbar } from "@mui/material";
import { Action } from "../components/SnackbarAction";

const theme = createTheme();
interface SignupDto {
  userName: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters"),
  });

  const handleSubmit = (data: SignupDto) => {
    setLoading(true);
    const url = "/auth/sign-up";
    const body = {
      userName: data.userName,
      email: data.email,
      password: data.password,
    };
    apiClient(process.env.NEXT_PUBLIC_API_URL)
      .post(url, { ...body })
      .then((data) => {
        setLoading(false);
        setShowMessage(true);
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
              Sign up
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
                  handleSubmit(values as unknown as SignupDto);
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
                          name="userName"
                          placeholder="Enter User Name"
                          label="User Name"
                        />
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
                          Sign Up
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/sign-in" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={5000}
            action={<Action handleClose={() => setShowMessage(false)} />}
            open={showMessage}
            onClose={() => setShowMessage(false)}
            message={"Sign Up is successfully processed"}
          />
        </Container>
      </main>
    </ThemeProvider>
  );
}
