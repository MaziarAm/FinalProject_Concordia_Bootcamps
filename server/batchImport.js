const { MongoClient } = require("mongodb");
var fs = require("file-system");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Parsing the JSON files from the data folder.
const admins = JSON.parse(fs.readFileSync("./data/admin.json"));
const users = JSON.parse(fs.readFileSync("./data/users.json"));
const courses = JSON.parse(fs.readFileSync("./data/courses.json"));

//Creating the batchImport function and connecting to DB.
const batchImport = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");

    // adding the data to DB.
    const admin = await db.collection("users").insertMany(admins);
    if (admin.insertedCount === admins.length) {
      console.log("Admin added");
    } else {
      console.log("Nothing was added");
    }

    // const user = await db.collection("users").insertMany(users);
    // if (user.insertedCount === users.length) {
    //   console.log("Users were added ");
    // } else {
    //   console.log("Nothing was added ");
    // }

    // const course = await db.collection("classes").insertMany(courses);
    // if (course.insertedCount === courses.length) {
    //   console.log("Classes were added ");
    // } else {
    //   console.log("Nothing was added ");
    // }

    client.close();
  } catch (e) {
    console.log(e.message);
  }
};

batchImport();
