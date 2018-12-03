var express = require("express");
var router = express.Router();
let blogArray = []; 
let id = 1;

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("Blog Api");
});

/* POST users listing. */
router.post("/create", function(req, res, next) {
  let body = req.body; //Initailize body to req.body
  body.id = id;
  id += 1;
  blogArray.push(body);
  console.log(blogArray);
  res.send("New Post");
});

/* GET users listing. */
router.get("/read/:id", function(req, res, next) {
  let blogId = req.params.id;
  let output = blogArray.find(item => item.id == blogId);
  res.send(output);
});

/* PUT users listing. */
router.put("/update/:id", function(req, res, next) {
  let blogId = req.params.id;
  blogArray[blogId - 1] = req.body;
 
  console.log(`Updated  post ${blogId}`);
  res.send(req.body);
});

/* DELETE users listing. */
router.delete("/delete", function(req, res, next) {
    var delid = req.params.id;
    var result = blogId.find(item => item.id == delid);
    let itemDel = blogId.indexOf(result);
    blogId.splice(itemDel,1);
    res.send("Deleted");
    console.log(blogId.splice(blogId[1],1))
});

router.get("/all", function(req, res, next) {
  res.send(blogArray);
});

module.exports = router;
