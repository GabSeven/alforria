import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppTheme from "./theme/AppTheme";
import Typography from "@mui/material/Typography";
import MainContent from "./../components/MainContent";
import Latest from "./../components/Latest";
import Footer from "./../components/Footer";

export default function MainPage() {
  return (
    <>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <MainContent />
        <Latest />
      </Container>
    </>
  );
}
