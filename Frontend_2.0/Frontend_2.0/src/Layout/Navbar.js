import { AppBar, Toolbar, Stack, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="relative" style={{ zIndex: 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Konnect
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/login/customer")}>
              Login
            </Button>
            <Button color="inherit">About US</Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <div className="mb-5"></div>
    </>
  );
}

export default Navbar;
