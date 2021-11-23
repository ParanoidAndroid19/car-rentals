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

export default function Home() {
  // const classes = useStyles();
  // let history = useHistory();
  const [cars, setCars] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
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
                  <Button size="small">Reserve</Button>
                </div>
              </Card>
            );
          })
        : null}
    </div>
  );
}
