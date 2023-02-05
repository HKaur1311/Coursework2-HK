const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const ObjectID = require("mongodb").ObjectID;
const app = express();
let propertiesReader = require("properties-reader");
let propertiesPath = path.resolve(__dirname, "conf/db.properties");
let properties = propertiesReader(propertiesPath);
let dbPprefix = properties.get("db.prefix");
//encdoing URI
let dbUsername = encodeURIComponent(properties.get("db.user"));
let dbPwd = encodeURIComponent(properties.get("db.pwd"));
let dbName = properties.get("db.dbName");
let dbUrl = properties.get("db.dbUrl");
let dbParams = properties.get("db.params");
const uri = dbPprefix + dbUsername + ":" + dbPwd + dbUrl + dbParams;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
//adding MOngodb
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
let db = client.db(dbName);
// console.log(db);
// logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} request received at ${req.url}`);
  next();
};

app.use(logger);
app.use(morgan("short"));
// Image middleware
const imageMiddleware = express.static("public/images");

app.use("/images", (req, res, next) => {
  imageMiddleware(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send("Image not found");
    } else {
      next();
    }
  });
});
//param for collection name
app.param("collectionName", function (req, res, next, collectionName) {
  req.collection = db.collection(collectionName);
  return next();
});
//this can fecth lessons,users,orders and all other collections
app.get("/:collectionName", function (req, res, next) {
  req.collection
    .find({})
    .toArray(function (err, results) {
      if (err) {
        return next(err);
      }
      res.json(results);
    });
});

// add new order

app.post("/orders", (req, res) => {
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error connecting to database" });
    } else {
      const order = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        lessonId: req.body.lessonId,
        numberOfSpaces: req.body.numberOfSpaces,
      };
      db.collection("orders").insertOne(order, (error) => {
        if (error) {
          console.log(error);
          res.status(500).send({ message: "Error saving order" });
        } else {
          res.status(201).send({ message: "Order saved successfully" });
        }
        client.close();
      });
    }
  });
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
//start server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
