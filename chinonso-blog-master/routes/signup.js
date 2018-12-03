var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'blog_db';

let db;

MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully");
 
  db = client.db(dbName);
 
});

router.get('/all', function(req, res, next) {
	db.collection('users').find({}).toArray(function(err, result) {
    	console.log("Found the following records");
    	console.log(result)
    	res.send(result);
  	});
});

router.post('/signup',function(req, res, next) {
	db.collection('users').insert(req.body, function(err, result) {
		console.log(err, result)
		res.send(result);
	});
});

module.exports = router;

