const express = require("express");
const CarsRoutes = express.Router();
const {
  addCarsByOwner,
  bookCarsByRenters,
  findBookedCarDetails,
} = require("../controller/cars");

CarsRoutes.post("/add", addCarsByOwner);
CarsRoutes.post("/book", bookCarsByRenters);
CarsRoutes.get("/bookedCars", findBookedCarDetails);

module.exports = CarsRoutes;
