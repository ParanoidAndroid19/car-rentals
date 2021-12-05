import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import AtmIcon from "@mui/icons-material/Atm";
import CardContent from "@mui/material/CardContent";

export default function Cart() {
  const [bookings, setBookings] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        var dict = {};

        data.map((prod) => {
          dict[prod._id] = prod;
        });
        setProducts(dict);
        console.log(dict);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let userLS = JSON.parse(localStorage.getItem("user"));

      fetch("http://localhost:3000/booking/" + userLS.uid)
        .then((response) => response.json())
        .then((data) => {
          setBookings(data);
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function calculateCost(from, to, costPerDay) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    var start = new Date(from);
    var end = new Date(to);

    var days = Math.round(Math.abs((start - end) / oneDay));

    var cost = days * costPerDay;

    return cost;
  }

  function cancelBooking(bid) {
    fetch("http://localhost:3000/booking/bid", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Booking deleted successfully!");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      style={{
        marginLeft: "30px",
        marginRight: "30px",
      }}
    >
      <h2>Bookings</h2>

      <div>
        {bookings && products
          ? bookings.map((car) => {
              return (
                <Card
                  style={{
                    display: "flex",
                    width: "65%",
                    marginBottom: "10px",
                  }}
                  key={car._id}
                >
                  <img
                    src={"/images/" + products[car.product_id].image}
                    alt={products[car.product_id].car_model}
                    height="200px"
                    width="auto"
                  />
                  <CardContent>
                    <div>
                      <h3 style={{ margin: 0 }}>
                        {products[car.product_id].car_type}
                      </h3>
                      <p style={{ margin: 0, marginBottom: "10px" }}>
                        {products[car.product_id].car_model} or similar
                      </p>

                      {/* <div style={{ display: "flex", alignItems: "center" }}>
                          <AtmIcon />
                          <p style={{ margin: "5px" }}>{car.specification}</p>
                        </div> */}

                      {/* <h3 style={{ margin: 0 }}>Date</h3> */}
                      <p style={{ margin: 0, marginBottom: "10px" }}>
                        From {car.from_date.slice(0, 15)} to{" "}
                        {car.to_date.slice(0, 15)}
                      </p>

                      <p style={{ margin: 0, marginBottom: "10px" }}>
                        Pickup Location: {car.pickup_location}
                      </p>

                      <p style={{ margin: 0, marginBottom: "10px" }}>
                        Dropoff Location: {car.dropoff_location}
                      </p>
                    </div>
                  </CardContent>
                  <div style={{ flexGrow: 1 }} />
                  <div style={{ padding: "16px" }}>
                    <h3 style={{ margin: "5px", textAlign: "end" }}>
                      $
                      {calculateCost(
                        car.from_date,
                        car.to_date,
                        products[car.product_id].cost
                      )}
                    </h3>
                    <p style={{ margin: "5px", textAlign: "end" }}>
                      total cost
                    </p>
                    <Button
                      size="small"
                      variant="contained"
                      style={{ fontWeight: "bold" }}
                    >
                      Modify
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      style={{ fontWeight: "bold" }}
                      onClick={() => cancelBooking(car._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              );
            })
          : null}
      </div>
    </div>
  );
}
