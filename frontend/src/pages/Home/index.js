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
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

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

  const [carType, setCarType] = useState("");
  const [carModel, setCarModel] = useState("");
  const [capacity, setCapacity] = useState("");
  const [rating, setRating] = useState("");
  const [carCost, setCarCost] = useState("");
  const [carSpec, setCarSpec] = useState("");
  const [carImg, setCarImg] = useState("");

  const [editCar, setEditCar] = useState(null);

  var userLS = null;

  if (localStorage.getItem("user")) {
    userLS = JSON.parse(localStorage.getItem("user"));
  }

  const handleCarFilter = (event, newCars) => {
    setCarFilter(newCars);
  };

  const handleCapacityFilter = (event, newCapacity) => {
    setCapacityFilter(newCapacity);
  };

  const handlePriceFilter = (event, newPrice) => {
    setPriceFilter(newPrice);
  };

  function getAllCars() {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAllCars();
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
    } else {
      alert("Please login first to make a reserve");
    }
  }

  function addNewCar() {
    fetch("http://localhost:3000/admin/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        car_type: carType,
        car_model: carModel,
        capacity: capacity,
        rating: rating,
        cost: carCost,
        specification: carSpec,
        image: carImg,
        deleted: "0",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Car added successfully!");
        getAllCars();
        setCarType("");
        setCarModel("");
        setCapacity("");
        setRating("");
        setCarCost("");
        setCarSpec("");
        setCarImg("");
      })
      .catch((err) => console.log(err));
  }

  function deleteCar(pid) {
    fetch("http://localhost:3000/admin/delete", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id: pid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Car deleted successfully!");
        getAllCars();
      })
      .catch((err) => console.log(err));
  }

  function modifyCar() {
    fetch("http://localhost:3000/admin/update", {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id: editCar,
        car_type: carType,
        car_model: carModel,
        capacity: capacity,
        rating: rating,
        cost: carCost,
        specification: carSpec,
        image: carImg,
        deleted: "0",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Car edited successfully!");
        getAllCars();
        setCarType("");
        setCarModel("");
        setCapacity("");
        setRating("");
        setCarCost("");
        setCarSpec("");
        setCarImg("");
        setEditCar(null);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div style={{ marginTop: "2%" }}>
      {localStorage.getItem("user") ? (
        userLS.admin ? null : (
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
        )
      ) : (
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
      )}
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
            style={{ minWidth: "59%" }}
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
            style={{ minWidth: "59%" }}
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
                    key={car._id}
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
                    <CardContent
                      style={{
                        textDecoration:
                          car.deleted !== "0" ? "line-through" : "none",
                      }}
                    >
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

                    <div
                      style={{
                        padding: "16px",
                        textDecoration:
                          car.deleted !== "0" ? "line-through" : "none",
                      }}
                    >
                      <h3 style={{ margin: "5px", textAlign: "end" }}>
                        ${car.cost}
                      </h3>
                      <p style={{ margin: "5px", textAlign: "end" }}>per day</p>
                      {localStorage.getItem("user") ? (
                        userLS.admin ? (
                          <div style={{ display: "flex", marginTop: "100%" }}>
                            <IconButton
                              onClick={() => {
                                setEditCar(car._id);

                                setCarType(car.car_type);
                                setCarModel(car.car_model);
                                setCapacity(car.capacity);
                                // setRating("");
                                setCarCost(car.cost);
                                setCarSpec(car.specification);
                                setCarImg(car.image);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              style={{
                                display: car.deleted !== "0" ? "none" : "flex",
                              }}
                              onClick={() => deleteCar(car._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        ) : (
                          <Button
                            size="small"
                            variant="contained"
                            style={{ fontWeight: "bold" }}
                            onClick={() => reserveCar(car._id)}
                          >
                            Reserve
                          </Button>
                        )
                      ) : (
                        <Button
                          size="small"
                          variant="contained"
                          style={{ fontWeight: "bold" }}
                          onClick={() => reserveCar(car._id)}
                        >
                          Reserve
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })
            : null}
        </div>
        {localStorage.getItem("user") ? (
          userLS.admin ? (
            <div
              style={{ width: "22%", textAlign: "end", marginRight: "42px" }}
            >
              <TextField
                label="Car type"
                variant="outlined"
                value={carType}
                onChange={(event) => setCarType(event.target.value)}
                style={{ marginBottom: "15px" }}
              />
              <TextField
                label="Car model"
                variant="outlined"
                value={carModel}
                onChange={(event) => setCarModel(event.target.value)}
                style={{ marginBottom: "15px" }}
              />
              <TextField
                label="Capacity"
                variant="outlined"
                value={capacity}
                onChange={(event) => setCapacity(event.target.value)}
                style={{ marginBottom: "15px" }}
              />
              <TextField
                label="Rating"
                variant="outlined"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                style={{ marginBottom: "15px" }}
              />
              <TextField
                label="Cost"
                variant="outlined"
                value={carCost}
                onChange={(event) => setCarCost(event.target.value)}
                style={{ marginBottom: "15px" }}
              />
              <TextField
                label="Specification"
                variant="outlined"
                value={carSpec}
                onChange={(event) => setCarSpec(event.target.value)}
                style={{ marginBottom: "15px" }}
              />
              <TextField
                label="Image"
                variant="outlined"
                value={carImg}
                onChange={(event) => setCarImg(event.target.value)}
                style={{ marginBottom: "15px" }}
              />
              <div>
                {editCar ? (
                  <Button
                    size="small"
                    variant="contained"
                    style={{ fontWeight: "bold" }}
                    onClick={() => modifyCar()}
                  >
                    Update car
                  </Button>
                ) : (
                  <Button
                    size="small"
                    variant="contained"
                    style={{ fontWeight: "bold" }}
                    onClick={() => addNewCar()}
                  >
                    Add a new car
                  </Button>
                )}
              </div>
            </div>
          ) : null
        ) : null}
      </div>
    </div>
  );
}
