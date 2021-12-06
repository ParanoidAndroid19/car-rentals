import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login() {
  // const classes = useStyles();
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          if (password === "admin123test") {
            localStorage.setItem(
              "user",
              JSON.stringify({ uid: data._id, admin: true })
            );
          } else {
            localStorage.setItem(
              "user",
              JSON.stringify({ uid: data._id, admin: false })
            );
          }
          history.push("/");
          window.location.reload();
        } else {
          alert("Please enter correct login details");
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Login to your account</h2>

      <div style={{ display: "inline-grid", width: "20%" }}>
        <TextField
          label="Email"
          variant="outlined"
          style={{ marginBottom: "20px" }}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button
          variant="contained"
          style={{ fontWeight: "bold", marginTop: "20px" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
