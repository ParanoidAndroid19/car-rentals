import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Signup from "./pages/Signup/index";
import Cart from "./pages/Cart/index";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function App() {
  const history = useHistory();

  return (
    <div>
      <Router>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              <Link
                to="/"
                style={{
                  textDecoration: "None",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Car Rentals
              </Link>
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              style={{ backgroundColor: "white", marginRight: "20px" }}
            >
              <Link
                to="/signup"
                style={{
                  textDecoration: "None",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Signup
              </Link>
            </Button>
            <Button
              color="secondary"
              variant="contained"
              style={{ backgroundColor: "white", marginRight: "20px" }}
            >
              <Link
                to="/login"
                style={{
                  textDecoration: "None",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Login
              </Link>
            </Button>

            <IconButton>
              <Link
                to="/cart"
                style={{
                  color: "white",
                }}
              >
                <ShoppingCartIcon />
              </Link>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Route path={`/signup`} exact component={Signup} />
        <Route path={`/login`} exact component={Login} />
        <Route path={`/cart`} exact component={Cart} />
        <Route path={`/`} exact component={Home} />
        {/* <Route path='*' exact component={NotFoundPage} /> */}
      </Router>
    </div>
  );
}

export default App;
