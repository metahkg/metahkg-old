import React from "react";
import {
  Box,
  List,
  ListItem,
  Drawer,
  Divider,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  Create as CreateIcon,
  Info as InfoIcon,
  Code as CodeIcon,
  ManageAccounts as ManageAccountsIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import SearchBar from "./searchbar";
/*
* The sidebar used by Menu
* link to metahkg frontpage, search bar, sign in/register/logout,
* create topic, link to categories, about and source code,
* at the bottom, if signed in, a link to /profile/self
*/
export default function SideBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const categories = {
    "1": "Chit-chat",
    "2": "Stories",
    "3": "School",
    "4": "Admin",
    "5": "Leisure",
    "6": "IT",
  };
  const toggleDrawer =
    (o: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(o);
    };
  function onClick() {
    setOpen(false);
  }
  const links = ["/about", "/source"];
  let tempq = "";
  return (
    <div>
      <div>
        <IconButton
          sx={{ height: "40px", width: "40px" }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
      </div>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundImage: "none",
            backgroundColor: "primary.main",
          },
        }}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <div
            style={{
              width: "100%",
            }}
          >
            <List sx={{ width: "100%" }}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <ListItem button onClick={onClick}>
                  <ListItemIcon>
                    <img
                      className="svgwhite"
                      width="24px"
                      height="24px"
                      src="/logo.svg"
                      alt="Metahkg"
                    />
                  </ListItemIcon>
                  <ListItemText>Metahkg</ListItemText>
                </ListItem>
              </Link>
            </List>
            <div style={{ marginLeft: "10px", marginRight: "10px" }}>
              <SearchBar
                onChange={(e) => {
                  tempq = e.target.value;
                }}
                onKeyPress={(e: any) => {
                  if (e.key === "Enter" && tempq) {
                    if (window.location.pathname === "/search") {
                      window.location.replace(
                        `/search?q=${encodeURIComponent(tempq)}`
                      );
                    } else {
                      navigate(`/search?q=${encodeURIComponent(tempq)}`);
                    }
                  }
                }}
                initvalue={tempq}
              />
            </div>
          </div>
          <List>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={
                localStorage.signedin
                  ? "/logout"
                  : `/signin?returnto=${window.location.pathname}`
              }
            >
              <ListItem button onClick={onClick}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText>
                  {localStorage.signedin ? "Logout" : "Sign in / Register"}
                </ListItemText>
              </ListItem>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/create"
            >
              <ListItem button onClick={onClick}>
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText>Create topic</ListItemText>
              </ListItem>
            </Link>
          </List>
          <Divider />
          <div className="catlink" style={{ margin: "20px" }}>
            {Object.entries(categories).map((category: [string, string]) => (
              <Link
                to={`/category/${category[0]}`}
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                  textAlign: "left",
                  width: "50%",
                  fontSize: "16px",
                  lineHeight: "35px",
                }}
                onClick={onClick}
              >
                {category[1]}
              </Link>
            ))}
          </div>
          <Divider />
          <List>
            {["About", "Source code"].map((text, index) => (
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={links[index]}
              >
                <ListItem button key={text} onClick={onClick}>
                  <ListItemIcon>
                    {index === 0 ? <InfoIcon /> : <CodeIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
          {localStorage.signedin && (
            <div>
              <Divider />
              <List>
                <Link
                  to="/profile/self"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <ListItem button onClick={onClick}>
                    <ListItemIcon>
                      <ManageAccountsIcon />
                    </ListItemIcon>
                    <ListItemText>{localStorage.user}</ListItemText>
                  </ListItem>
                </Link>
              </List>
            </div>
          )}
        </Box>
      </Drawer>
    </div>
  );
}
