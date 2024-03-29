import { Link } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { AuthContext } from "../../Provider/Authprovider";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
      const { user, setUser } = React.useContext(AuthContext);
  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


      const handleLogout = () => {
        localStorage.clear();
        setUser({});
      };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            House Rant
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {" "}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="left">
                  {" "}
                  <Button sx={{ my: 1, display: "block" }}>
                    {" "}
                    <Link to="/">Home</Link>
                  </Button>
                  <Button sx={{ my: 1, display: "block" }}>
                    <Link to="/house-owner">Owner Dashboard</Link>
                  </Button>
                  <Button sx={{ my: 1, display: "block" }}>
                    {" "}
                    <Link to="/house-renter">House Renter Dashboard</Link>
                  </Button>
                  <Button sx={{ my: 1, display: "block" }}>
                    <Link to="/signUp"> Sing Up</Link>
                  </Button>
                  <Button sx={{ my: 1, display: "block" }}>
                    {" "}
                    <Link to="/login"> Login</Link>
                  </Button>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HOUSE RANT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="center">
                {" "}
                <Link to="/">Home</Link>
                <Link to="/house-owner" className="mx-3">
                  Owner Dashboard
                </Link>
                <Link to="/house-renter">House Renter Dashboard</Link>
                <Link to="/signUp" className="mx-3">
                  {" "}
                  Sing Up
                </Link>
                <Link to="/login"> Login</Link>
              </Typography>
            </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <MenuItem>
              <Typography textAlign="center" onClick={handleLogout}>
                Logout
              </Typography>
            </MenuItem>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
