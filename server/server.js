"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const companiesRouter = require("./routes/companies/companies");
// const itemsRouter = require("./routes/items/items");
// const userRouter = require("./routes/users/users");
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
// app.use(companiesRouter);
// app.use(itemsRouter);
// app.use(userRouter);

// this is our catch all endpoint.
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "You aren't supposed to be here.",
  });
});

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
