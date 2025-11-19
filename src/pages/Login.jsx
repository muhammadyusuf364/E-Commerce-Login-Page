import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { SitemarkIcon } from "../Components/CustomIcons";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
  },
}));

const VALID_USER = {
  username: "admin",
  password: "test123",
};

const validationRules = {
  username: {
    required: "Username is required",
    minLength: {
      value: 3,
      message: "Username must be at least 3 characters long",
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: "Username can only contain letters, numbers and underscores",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
  },
};

const defaultValues = {
  username: "",
  password: "",
};

export default function SignIn() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (
        data.username === VALID_USER.username &&
        data.password === VALID_USER.password
      ) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("isLoggedIn", "true");

        navigate("/home");

        reset();
      } else {
        alert("Username yoki parol noto'g'ri!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <>
      <CssBaseline />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl error={!!errors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Controller
                name="username"
                control={control}
                rules={validationRules.username}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="username"
                    type="text"
                    placeholder="username"
                    autoComplete="username"
                    autoFocus
                    fullWidth
                    variant="outlined"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    color={errors.username ? "error" : "primary"}
                  />
                )}
              />
            </FormControl>

            <FormControl error={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Controller
                name="password"
                control={control}
                rules={validationRules.password}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="password"
                    type="password"
                    placeholder="••••••"
                    autoComplete="current-password"
                    fullWidth
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    color={errors.password ? "error" : "primary"}
                  />
                )}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{ mt: 1 }}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </Box>

          <Divider>or</Divider>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
