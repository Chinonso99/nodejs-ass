var express = require("express");
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");


const url = "mongodb://localhost:27017";
let ObjectId = require("mongodb").ObjectID;

const dbName = "blogDBName";
let db;

MongoClient.connect(
  url,
  function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db = client.db(dbName);

  }
);

router.get("/", function (req, res, next) {
  res.render("Welcome to the blog");
});

router.get("/all", function (req, res, next) {
  let blogID = req.params.id;
  db.collection("article")
    .find({})
    .toArray(function (err, result) {
      console.log(err, result);
      res.send(result);
    });
});

router.post("/create", function (req, res, next) {
  let body = req.body;
  db.collection("article").insertOne(body, function (err, result) {
    console.log(err, result);
    res.send(result);
  });
});

router.get("/read:id", function (req, res, next) {
  let blogID = req.params.id;
  blogID = new ObjectId(blogID);
  db.collection("article")
    .find({ _id: blogID })
    .toArray(function (err, result) {
      console.log(err, result);
      res.send(result);
    });
});

router.put("/update:id", function (req, res, next) {
  let body = req.body;
  let blogID = req.params.id;
  blogID = new ObjectId(blogID);
  db.collection("article").update({ _id: blogID }, { $set: body }, function (
    err,
    result
  ) {
    console.log(err, result);
    res.send(result);
  });
});

router.delete("/delete:id", function (req, res, next) {
  let blogID = req.params.id;
  blogID = new ObjectId(blogID);
  db.collection("article").deleteOne({ _id: blogID }, function (err, result) {
    console.log(err, result);
    res.send(result);
  });
});
module.exports = router;
