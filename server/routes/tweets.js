"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    console.log("got here!");
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
   //     res.status(201).send();
        res.status(201).send(req.body);
      }
    });
  });

  tweetsRoutes.post("/login", function(req, res) {
    if (!req.body.user) {
      res.status(400).json({ error: 'invalid request: no data in POSTer body'});
      return;
    }
    let user = req.body.user;
    let password = req.body.password;
    DataHelpers.findUser(user, password, (err, users) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        var user_valid = false;
        for (let user1 of users){
          if(user1.user === user && user1.password === password){
            //console.log("------FOUND HIM : ", user1.user, user1.password);
            user_valid = true;
            req.session.user_id = user._id;
            break;
          }
        }
        if(user_valid){
          res.status(201).send();
          //res.redirect("/");
        } else {
         res.redirect("/login");
        }

      }
    });
  });

  return tweetsRoutes;

}
