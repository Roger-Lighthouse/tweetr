"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
     // simulateDelay(() => {
        //db.tweets.push(newTweet);
        db.collection("tweets").insertOne(newTweet);
        callback(null, true);
     // });
    },


    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      //simulateDelay(() => {
      //const sortNewestFirst = (a, b) => {a.created_at - b.created_at};

      db.collection("tweets").find({}).toArray((err, tweets) => {
        if (err) {
          callback(err);
        } else {
          callback(null, tweets);
        }
      });
    },


    //{"user": user, "password": password}
    findUser: function(user, password, callback) {
      db.collection("login").find({}).toArray((err, users) => {
        if (err) {
          callback(err);
        } else {
          console.log("Users:", users);
          callback(null, users);
        }
      });
    }

  }
}

