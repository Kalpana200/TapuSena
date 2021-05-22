const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const ejs = require("ejs");
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/soeDB",{useNewUrlParser: true, useUnifiedTopology: true });
const sessionschema = mongoose.Schema({
     day:String,
     date: String,
     time: String
});
const Item = mongoose.model("Item", sessionschema);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.render("index");
});
app.post("/emergency",function(req,res)
{
  Item.find({}, function (err, foundItems) {
       if (!err) {
            res.render("emergency", {posts: foundItems});
       }
       else {
            console.log("error");
       }
  });
});
app.post("/",function(req,res){
  var all= Date();
  var day= all.substr(0,4);
  var date= all.substr(4,11);
  var time= all.substr(16,9);
  console.log(time);
  const t = new Item({
       day:day,
       date: date,
       time: time
  });
  t.save(function(err)
{
  if(!err)
  res.redirect("/");
});
});
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
