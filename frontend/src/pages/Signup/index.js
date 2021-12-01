import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

export default function Signup() {
  // const classes = useStyles();
  // let history = useHistory();
  const [dob, setDob] = React.useState(new Date("1998-08-18T21:11:54"));

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Create an account</h2>

      <div style={{ display: "inline-grid", width: "20%" }}>
        <TextField
          label="Name"
          variant="outlined"
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Email"
          variant="outlined"
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Phone"
          variant="outlined"
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Address"
          variant="outlined"
          style={{ marginBottom: "20px" }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date of birth"
            inputFormat="MM/dd/yyyy"
            value={dob}
            onChange={(newValue) => {
              setDob(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          style={{ marginBottom: "20px", marginTop: "20px" }}
        />

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
