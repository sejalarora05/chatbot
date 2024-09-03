import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import logo from "../../../assets/images/NetsmartzLogo.png";
import { NAV_PAGES } from "../../../utils/constant";

import "./Drawer.scss";
function SideDrawer(): JSX.Element {
  const [openDrawer, setDrawer] = useState(false);
  return (
    <React.Fragment>
      <Drawer
        open={openDrawer}
        onClose={() => setDrawer(false)}
        classes={{ paper: "drawer-paper" }}
      >
        <List>
          {NAV_PAGES.map((page, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                <page.icon />
              </ListItemIcon>
              <ListItemText>{page.label}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton onClick={() => setDrawer(!openDrawer)}>
        <MenuRoundedIcon />
        <div className="logo-container">
          <img src={logo} alt="logo" loading="lazy" height={35} />
        </div>
      </IconButton>
    </React.Fragment>
  );
}

export default SideDrawer;
