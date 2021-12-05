import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import AtmIcon from "@mui/icons-material/Atm";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TimePicker from "@mui/lab/TimePicker";

export default function Home() {
  // const classes = useStyles();
  // let history = useHistory();
  const [cars, setCars] = useState(null);
  const [carFilter, setCarFilter] = useState(() => []);
  const [capacityFilter, setCapacityFilter] = useState(() => []);
  const [priceFilter, setPriceFilter] = useState(() => []);
  const [pickUpLoc, setPickUpLoc] = useState("");
  const [dropOffLoc, setDropOffLoc] = useState("");
  const [date, setDate] = React.useState([null, null]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleCarFilter = (event, newCars) => {
    setCarFilter(newCars);
  };

  const handleCapacityFilter = (event, newCapacity) => {
    setCapacityFilter(newCapacity);
  };

  const handlePriceFilter = (event, newPrice) => {
    setPriceFilter(newPrice);
  };

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function reserveCar(pid) {
    if (localStorage.getItem("user")) {
      let userLS = JSON.parse(localStorage.getItem("user"));

      fetch("http://localhost:3000/booking", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          customer_id: userLS.uid,
          product_id: pid,
          from_date: date[0],
          to_date: date[1],
          pickup_location: pickUpLoc,
          dropoff_location: dropOffLoc,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert("Booking created successfully!");
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div style={{ marginTop: "2%" }}>
      <div
        style={{
          marginLeft: "30px",
          marginRight: "30px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <TextField
          label="Pick-up location"
          variant="outlined"
          value={pickUpLoc}
          onChange={(event) => setPickUpLoc(event.target.value)}
        />
        <TextField
          label="Drop-off location"
          variant="outlined"
          value={dropOffLoc}
          onChange={(event) => setDropOffLoc(event.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            startText="Pick-up date"
            endText="Drop-off date"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
              console.log(date);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
          <TimePicker
            label="Pick-up time"
            value={startTime}
            onChange={(newValue) => {
              setStartTime(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            label="Drop-off time"
            value={endTime}
            onChange={(newValue) => {
              setEndTime(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "44px",
          marginTop: "15px",
        }}
      >
        <Button
          variant="contained"
          style={{ marginBottom: "3%", fontWeight: "bold" }}
        >
          Search
        </Button>
      </div> */}
      <div style={{ display: "flex", marginTop: "35px" }}>
        <div
          style={{
            // backgroundColor: "#F8F5F4",
            width: "25%",
            paddingLeft: "30px",
            paddingRight: "10px",
          }}
        >
          <h2 style={{ marginTop: "0px" }}>Filter By</h2>
          <h4>Car Type</h4>
          <ToggleButtonGroup
            orientation="vertical"
            value={carFilter}
            onChange={handleCarFilter}
            aria-label="text formatting"
            style={{minWidth: "59%"}}
          >
            <ToggleButton value="midsize suv">Midsize SUV</ToggleButton>
            <ToggleButton value="luxury">Luxury</ToggleButton>
            <ToggleButton value="compact">Compact</ToggleButton>
            <ToggleButton value="compact suv">Compact SUV</ToggleButton>
          </ToggleButtonGroup>

          <h4>Capacity</h4>
          <ToggleButtonGroup
            orientation="vertical"
            value={capacityFilter}
            onChange={handleCapacityFilter}
            aria-label="text formatting"
          >
            <ToggleButton value={5}>2-5 passengers</ToggleButton>
            <ToggleButton value={6}>6 or more passengers</ToggleButton>
          </ToggleButtonGroup>

          <h4>Total Price</h4>
          <ToggleButtonGroup
            orientation="vertical"
            value={priceFilter}
            onChange={handlePriceFilter}
            aria-label="text formatting"
            style={{minWidth: "59%"}}
          >
            <ToggleButton value={75}>Less than $75</ToggleButton>
            <ToggleButton value={200}>$75 to $200</ToggleButton>
            <ToggleButton value={201}>$200 and above</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div>
          {cars
            ? cars.map((car) => {
                return (
                  <Card
                    style={{
                      display: "flex",
                      width: "fit-content",
                      marginBottom: "10px",
                    }}
                  >
                    {/* <CardMedia
                  component="img"
                  alt={car.car_model}
                  width="30"
                  image={"/images/" + car.image}
                /> */}
                    <img
                      src={"/images/" + car.image}
                      alt={car.car_model}
                      height="200px"
                      width="auto"
                    />
                    <CardContent>
                      <div>
                        <h3 style={{ margin: 0 }}>{car.car_type}</h3>
                        <p style={{ margin: 0, marginBottom: "10px" }}>
                          {car.car_model} or similar
                        </p>

                        <div style={{ display: "flex", alignItems: "center" }}>
                          <PersonIcon />
                          <p style={{ margin: "5px" }}>{car.capacity}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <AtmIcon />
                          <p style={{ margin: "5px" }}>{car.specification}</p>
                        </div>
                      </div>
                    </CardContent>

                    <div style={{ padding: "16px" }}>
                      <h3 style={{ margin: "5px", textAlign: "end" }}>
                        ${car.cost}
                      </h3>
                      <p style={{ margin: "5px", textAlign: "end" }}>per day</p>
                      <Button
                        size="small"
                        variant="contained"
                        style={{ fontWeight: "bold" }}
                        onClick={() => reserveCar(car._id)}
                      >
                        Reserve
                      </Button>
                    </div>
                  </Card>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
