import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export default function Signup() {
  // const classes = useStyles();
  let history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(new Date("1998-08-18T21:11:54"));
  const [errorFields, setErrorFields] = useState({
    email: false,
    pass: false,
  });

  function handleSignup() {
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        address: address,
        dob: dob,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          alert("Account created!");
          history.push("/login");
        } else {
          alert("Please try again");
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Create an account</h2>

      <div style={{ display: "inline-grid", width: "20%" }}>
        <TextField
          label="Name"
          variant="outlined"
          style={{ marginBottom: "20px" }}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <ClickAwayListener
          onClickAway={() => {
            if (email) {
              let re = /\S+@\S+\.\S+/;
              if (re.test(email)) {
                setErrorFields({
                  ...errorFields,
                  email: false,
                });
              } else {
                setErrorFields({
                  ...errorFields,
                  email: true,
                });
              }
            }
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            style={{ marginBottom: "20px" }}
            value={email}
            error={errorFields.email}
            helperText={errorFields.email ? "Invalid email" : null}
            onChange={(event) => setEmail(event.target.value)}
          />
        </ClickAwayListener>
        <TextField
          label="Phone"
          variant="outlined"
          style={{ marginBottom: "20px" }}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <TextField
          label="Address"
          variant="outlined"
          style={{ marginBottom: "20px" }}
          value={address}
          onChange={(event) => setAddress(event.target.value)}
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
          value={password}
          error={errorFields.pass}
          helperText={
            errorFields.pass
              ? "Password length should be between 6 to 20 characters"
              : null
          }
          onChange={(event) => {
            if (
              event.target.value.length < 6 ||
              event.target.value.length > 20
            ) {
              setErrorFields({
                ...errorFields,
                pass: true,
              });
            } else {
              setErrorFields({
                ...errorFields,
                pass: false,
              });
            }
            setPassword(event.target.value);
          }}
        />

        <Button
          variant="contained"
          style={{ fontWeight: "bold", marginTop: "20px" }}
          onClick={handleSignup}
        >
          Create account
        </Button>
      </div>
    </div>
  );
}
