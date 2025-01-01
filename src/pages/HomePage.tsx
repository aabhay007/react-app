import React from "react";
import { Container, Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import ScreenRecorder from "../components/Capture/Capture";
const HomePage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
        <Box>
          <Typography variant="h2" gutterBottom sx={{ color: "grey.600" }}>
            Welcome to Our App
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This is the home page. Navigate through the app to explore more
            features!
          </Typography>
          <ScreenRecorder/>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;
