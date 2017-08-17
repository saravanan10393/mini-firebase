const userModel = require('../model/user.model');

var router = require('express').Router()

module.exports = function (router) {
  router.get('/text', function(req, res){
    res.set({'Content-Type':"text/plain"});
    res.send("sample text response");
  });

  router.post('/register', function (req, res) {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ error: true, message: "Email or password is missing" });
      return;
    }

    userModel.create(req.body).then(
      (user) => res.send(user),
      (err) => {
        console.error(err);
        res.status(400).send({ error: true, message: err });
      }
    );
  });

  router.post("/signin", function(req, res){
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ error: true, message: "Email or password is missing" });
      return;
    }

    userModel.get(req.body.email).then(
      (user) => {
        if(user.password != req.body.password){
          res.status(400).send({ error: true, message: "Username or password is wrong" });
          return;  
        }
        delete user.password;
        res.send(user);
      },
      (err) => {
        console.error(err);
        res.status(400).send({ error: true, message: "Username or password is wrong" });
      }
    );
  });

  router.patch("/user/update/:user_id", function(req, res){
    userModel.updateProfile(req.params.user_id, req.body)
      .then(
        (user) => res.send(user),
        (err) => res.status(400).send({error: true, message: "Failed to update user profile"}) 
      );
  });

  router.get('/ping', function(req, res){
    setTimeout(() => {
      res.send({message : "ping message"});
    }, 2000);
  });

};
