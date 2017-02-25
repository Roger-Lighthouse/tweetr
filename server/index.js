"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const cookieSession = require("cookie-session")
const bcrypt = require("bcrypt");

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";  //27017

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// The in-memory database of tweets. It's a basic object with an array in it.
//const db = require("./lib/in-memory-db");


app.use(cookieSession({
  name: 'session',
  keys: ['user_id'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
/*
const password1 = "purple-monkey-dinosaur"; // you will probably this from req.params
const hashed_password1 = bcrypt.hashSync(password1, 10);
const password2 = "dishwasher-funk"; // you will probably this from req.params
const hashed_password2 = bcrypt.hashSync(password2, 10);

 if((users[user_id].email === req.body.email) && ((bcrypt.compareSync(password, user.password)))){
      req.session.user_id = user_id;



*/


MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

  // The `data-helpers` module provides an interface to the database of tweets.
  // This simple interface layer has a big benefit: we could switch out the
  // actual database it uses and see little to no changes elsewhere in the code
  // (hint hint).
  //
  // Because it exports a function that expects the `db` as a parameter, we can
  // require it and pass the `db` parameter immediately:
  const DataHelpers = require("./lib/data-helpers.js")(db);



  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

});




