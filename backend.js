const http = require("http");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Card = require("./card");
const { db } = require("./card");
const ejs = require("ejs");
const bodyParser = require("body-parser");

app.engine("html", ejs.renderFile);
app.use(express.static("/index"));

const MONGODB_URI = config.mongoKey;

mongoose.connect(MONGODB_URI || "mongodb://localhost/test");
mongoose.connection
  .once("open", function () {
    console.log("Connection succesful");
  })
  .on("error", function (error) {
    console.log("Connection error");
  });

var PORT = process.env.PORT || 5050;
const server = http.Server(app).listen(PORT);
var results = [];
var alerts = [];

// Card.find({}, function(err, cards){
//     cards.forEach(element => {
//         element.remove();
//     });
// });

app.get("/", function (req, res) {
  results = [];
  Card.find({}, function (err, user) {
    user.forEach((element) => {
      // console.log(element.name);
      results.push(element);
    });
    res.render(__dirname + "/index.html", { people: results });
    // console.log(results);
  });
});

var urlencodedparser = bodyParser.urlencoded({ extended: false });
app.post("/info", urlencodedparser, function (req, res) {
  console.log(req.body.name);
  if (req.body.name != "" || req.body.name != "\n") {
    var card = new Card({
      name: req.body.name,
      info: req.body.phrase,
      url: req.body.url,
    });

    card.save({}, function (err, docs) {
      // results = []
      // console.log('I am here');
      // Card.find({}, function(err, user){
      //     user.forEach(element => {
      //         console.log(element.name);
      //         results.push(element.name);
      //     });
      //     // res.render(__dirname + '/index.html', {people : results})
      //     console.log(results);
      // });

      res.redirect("/");
    });
  }
});

app.post("/buttons", urlencodedparser, function (req, res) {
  Card.findOne({ name: req.body.alert }, function (err, docs) {
    console.log(docs.info);

    res.render(__dirname + "/second.html", {
      name: docs.name,
      info: docs.info,
      url: docs.url,
    });
  });
});

app.post("/back", urlencodedparser, function (req, res) {
  res.redirect("/");
});

app.post("/delete", urlencodedparser, function (req, res) {
  Card.findOneAndDelete({ name: req.body.choose }, function (err) {
    res.redirect("/");
  });
});
