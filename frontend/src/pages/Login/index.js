import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login() {
  // const classes = useStyles();
  // let history = useHistory();

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Login to your account</h2>

      <div style={{ display: "inline-grid", width: "20%" }}>
        <TextField
          label="Email"
          variant="outlined"
          style={{ marginBottom: "20px" }}
        />
        <TextField label="Password" type="password" variant="outlined" />

        <Button
          variant="contained"
          style={{ fontWeight: "bold", marginTop: "20px" }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
