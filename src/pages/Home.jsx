import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function Home() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");

    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        padding: 4,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          maxWidth: 600,
          width: "100%",
          padding: 4,
          textAlign: "center",
          boxShadow:
            "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
        }}
      >
        <Typography variant="h3" gutterBottom>
          👋 Salom, {username}!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          E-Commerce platformasiga xush kelibsiz
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body1" sx={{ mb: 3 }}>
          Bu sizning Home sahifangiz. Bu yerda siz:
        </Typography>

        <Box
          sx={{
            textAlign: "left",
            mb: 4,
            pl: 4,
            "& > *": { mb: 1 },
          }}
        >
          <Typography>• Mahsulotlarni ko'rishingiz mumkin</Typography>
          <Typography>• Buyurtmalarni boshqarishingiz mumkin</Typography>
          <Typography>• Profilingizni tahrirlashingiz mumkin</Typography>
          <Typography>• Savdo statistikasini ko'rishingiz mumkin</Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleLogout}
        >
          Chiqish
        </Button>
      </Card>
    </Box>
  );
}
