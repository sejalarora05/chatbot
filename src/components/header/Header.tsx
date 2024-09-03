import { useTheme } from "@emotion/react";
import { AppBar, Button, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import logo from "../../assets/images/logo4.png";
import "./Header.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideDrawer from "./drawer/Drawer";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../api_config/slices/authSlice";


function scrollToBottom() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
}

function Header(): JSX.Element {
  const [value, setValue] = useState(0);
  const theme: any = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const { pathname } = useLocation();
  const isHome = pathname === "/" ? true : false;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setAuthToken({ token: null }))
    navigate('/login')
    // window.location.reload()
  }

  return (
    <AppBar
      color={isHome ? "transparent" : "secondary"}
      position="static"
      sx={
        { position: "absolute", boxShadow: 0, paddingTop: '5px', backgroundColor: 'black !important' }
      }
    >
      <Toolbar className="main-container">
        {isMatch ? (
          <>
            <SideDrawer />
          </>
        ) : (
          <>
            <Link to={"/"}>
              <img
                src={logo}
                alt="logo"
                loading="lazy"
                className="header-logo"
              />
            </Link>

            {/* <Tabs
              sx={{ marginLeft: "auto" }}
              value={value}
              onChange={(e, value) => setValue(value)}
              textColor="inherit"
              indicatorColor="secondary"
            > */}
            {/* {NAV_PAGES.map((page, index) => (
                <Tab key={index} label={page.label} />
              ))} */}

            <div className="nav-container">
              {/* <Link to={"/"} className={isHome ? "nav-link" : "nav-link-inner"}>
                <Typography color={"white"}>Home</Typography>
              </Link> */}
              {/* {pathname === "/" ? (
                <a
                  href="#services"
                  className={isHome ? "nav-link" : "nav-link-inner"}
                >
                  <Typography color={"white"}>Services</Typography>
                </a>
              ) : (
                <Link to="/#services" className={isHome ? "nav-link" : "nav-link-inner"}>
                  <Typography color={"white"}>Services</Typography>
                </Link>
              )} */}

              <Button onClick={handleLogout} color="secondary" variant="outlined">Logout</Button>


            </div>
            {/* </Tabs> */}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
