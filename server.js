// dependencies

var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");
var path = require("path");


// listening on this port

var PORT = 3000;

//turn express on
var app = express();


// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB

var MONGDB_URI = process.env.MONGDB_URI || "mongodb://localhost/mongoose-hw-populator-3"

mongoose.connect(MONGDB_URI);


// mongoose.connect("mongodb://localhost/mongoose-hw-populator-3", { useNewUrlParser: true });

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/savedarticles", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/savedArticles.html"));
});

// A GET route for scraping the echoJS website
app.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.theonion.com/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("section").each(function (i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
     

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

app.get("/articles", function (req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function (dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });

});

  // Route for getting all Articles from the db
  app.get("/saved", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbSaved) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbSaved);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
    });  

app.listen(PORT, function () {
  console.log("App running on http://localhost:" + PORT);
});