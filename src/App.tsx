import "./App.css";
import React from "react";
import Theme from "./lib/theme";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/signup";
import Signin from "./pages/signin";
import Thread from "./pages/thread";
import AddComment from "./pages/AddComment";
import Create from "./pages/create";
import Category from "./pages/category";
import Logout from "./components/logout";
import Search from "./pages/search";
import Profile from "./pages/profile";
import History from "./pages/history";
import Menu from "./components/menu";
import { useMenu } from "./components/MenuProvider";
import { Box } from "@mui/material";
import { useWidth } from "./components/ContextProvider";
function Source() {
  window.location.href = "https://gitlab.com/metahkg/metahkg";
  return <div />;
}
/*
 * Menu is not in the Routes to prevent unnecessary rerenders
 * Instead it is controlled by components inside Routes
 */
export default function App() {
  const [menu] = useMenu();
  const [width] = useWidth();
  return (
    <Theme
      primary={{ main: "#222222" }}
      secondary={{ main: "#F5BD1F", dark: "#ffc100" }}
    >
      <Box sx={{ maxHeight: "100vh", backgroundColor: "primary.dark" }}>
        <Router>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {(menu || window.location.pathname.split("/")[1] === "thread") && (
              <div style={{ width: width < 760 ? "100vw" : "30vw" }}>
                <Menu/>
              </div>
            )}
            <Routes>
              <Route path="/" element={<Navigate to="/category/1" />} />
              <Route path="/thread/:id" element={<Thread />} />
              <Route path="/comment/:id" element={<AddComment />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/register" element={<Register />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/create" element={<Create />} />
              <Route path="/search" element={<Search />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/source" element={<Source />} />
              <Route path="/about" element={<Source />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/history/:id" element={<History />} />
            </Routes>
          </div>
        </Router>
      </Box>
    </Theme>
  );
}
