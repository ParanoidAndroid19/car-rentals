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

function App() {
  const history = useHistory();

  return (
    <div>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Car Rentals
            </Typography>
            <Button color="inherit">
              <Link to="/login">Login</Link>
            </Button>
          </Toolbar>
        </AppBar>
        <Route path={`/signup`} exact component={Signup} />
        <Route path={`/login`} exact component={Login} />
        <Route path={`/`} exact component={Home} />
        {/* <Route path='*' exact component={NotFoundPage} /> */}
      </Router>
    </div>
  );
}

export default App;
