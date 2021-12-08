"use strict";

const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getAllClasses = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    const classes = await db.collection("classes").find().toArray();
    res.status(200).json({ status: 200, data: classes });
    client.close();
  } catch (e) {
    console.log(e.message);
  }
};

const getClassesById = async (req, res) => {
  const _id = Number(req.params._id);
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    db.collection("classes").findOne({ _id }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, _id, data: result })
        : res.status(400).json({ status: 400, _id, msg: "Not Found" });
      client.close();
    });
  } catch (e) {
    console.log(e.message);
  }
};

const createOrder = async (req, res) => {
  console.log(req.body);
  try {
    const client = new MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db("final-project");

    const classInfo = await db
      .collection("classes")
      .findOne({ _id: req.body.course_id });
    console.log(classInfo);
    if (classInfo.availability <= 0) {
      return res.status(400).json({ status: 400, msg: "Class is full" });
    } else {
      const updateInventory = await db
        .collection("classes")
        .updateOne({ _id: req.body.course_id }, { $inc: { availability: -1 } });
      // console.log(updateInventory);
      if (updateInventory.modifiedCount === 1) {
        await db.collection("classReservations").insertOne(req.body);
        return res
          .status(200)
          .json({ status: 200, message: "Registration successful" });
      }
    }

    client.close();
  } catch (e) {
    console.log(e.message);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    const orders = await db.collection("classReservations").find().toArray();
    res.status(200).json({ status: 200, data: orders });
    client.close();
  } catch (e) {
    console.log(e.message);
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    const _id = req.body.email;
    await client.connect();
    const db = client.db("");
    await db.collection("classReservations").deleteOne({ email: _id });
    res.status(200).json({
      status: 200,
      message: "order deleted",
    });
    client.close();
  } catch (e) {
    console.log(e);
  }
};

const getOrdersByEmail = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    const classInfo = await db
      .collection("classReservations")
      .find({ email: req.params.email })
      .toArray();

    if (classInfo.length) {
      res
        .status(200)
        .json({ status: 200, message: "success", data: classInfo });
    } else {
      res.status(400).json({ res, status: 400, message: "Order not found" });
    }
    client.close();
  } catch (e) {
    console.log(e.message);
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    console.log(req.params);
    const user = await db
      .collection("users")
      .findOne({ email: req.params.email });
    console.log(user);

    if (user.email === req.params.email) {
      res.status(200).json({ status: 200, message: "success", data: user });
    } else {
      res.status(400)({ res, status: 400, message: "User not found" });
    }
    client.close();
  } catch (e) {
    console.log(e.message);
  }
};

const postUser = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    const { fullName, email } = req.body;
    console.log(fullName);
    console.log(email);

    const userInfo = {
      name: fullName,
      email,
      type: "user",
    };

    await client.connect();
    const db = client.db("final-project");
    const existingUser = await db
      .collection("users")
      .findOne({ email: req.body.email });
    console.log(existingUser);

    if (existingUser === null) {
      await db.collection("users").insertOne(userInfo);
      res.status(200).json({ status: 200, message: "user added to db" });
    } else {
      sendResponse({ res, status: 400, message: "user already exists" });
    }
    client.close();
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
  }
};

const addReview = async (req, res) => {
  try {
    const { course } = req.params;
    console.log(course);
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log(req.body);
    const db = client.db("final-project");
    const review = await db
      .collection("classes")
      .updateOne({ _id: Number(course) }, { $push: { reviews: req.body } });
    res.status(200).json({ status: 200, message: "Review added" });
    console.log(review);
    client.close();
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllClasses,
  getClassesById,
  getAllOrders,
  deleteOrderById,
  getOrdersByEmail,
  createOrder,
  getUserByEmail,
  postUser,
  addReview,
};
