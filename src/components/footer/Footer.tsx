import { Container, Typography } from "@mui/material";
import "./Footer.scss";

function Footer(): JSX.Element {
  // Footer
  return (
    <footer className="footer-container">
      <Container maxWidth="xl" disableGutters>
        <Typography
          variant="subtitle1"
          align="center"
          color="white"
          component="p"
          fontSize="14px"
        >
          {/* © {new Date().getFullYear()} Netsmartz. */}
          Powered By AI Smartz Strategy Group
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
