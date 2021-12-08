"use strict";
const {
  getAllClasses,
  getClassesById,
  getAllOrders,
  deleteOrderById,
  getOrdersByEmail,
  createOrder,
  getUserByEmail,
  postUser,
  addReview,
} = require("./handlers");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = 4000;
require("dotenv").config();

const app = express();
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("tiny"));
// app.use(express.static("./server/assets"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));

// REST endpoints
app.get("/classes", getAllClasses);
app.get("/classes/:_id", getClassesById);
app.get("/users/email/:email", getUserByEmail);
app.post("/users/email", postUser);
app.patch("/classes/:course", addReview);
app.get("/orders", getAllOrders);
app.delete("/orders/:_id", deleteOrderById);
app.get("/orders/:email", getOrdersByEmail);
app.post("/orders", createOrder);

// this is our catch all endpoint.
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "You aren't supposed to be here.",
  });
});

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
