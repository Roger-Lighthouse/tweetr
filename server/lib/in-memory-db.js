"use strict";

// Requiring a JSON file automatically parses it and returns the data. These
// are just example tweets to make it less tedious to style the app initially.

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";  //27017


const db = {
  //tweets: require("../data-files/initial-tweets")
  tweets: require("mongodb://localhost:27017/tweeter")
}

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

}

module.exports = db;
