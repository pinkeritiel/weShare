var mongoose = require('mongoose');
var passport = require('passport');
var _ = require('lodash');

var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
//var User = require("../models/user");
//var Book = require("../models/book");
//var mongoose = require('mongoose');
var Member = require('../models/member');

/*
MongoClient.Promise = global.Promise;
var configDB = require('./config/database.js');

// Connect
const connection = (closure) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
//MongoClient.connect(configDB.url)
//  .then(() =>  console.log('connection succesful'))
//  .catch((err) => console.error(err));
   return MongoClient.connect(configDB.url, (err, db) => {
       if (err) return console.log(err);
       closure(db);
   });
};


// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    console.log('get users');
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/register',(req,res)=> {
    var _username = req.query.name;
    var _password = req.query.password;
    console.log('finding  ' + _username + ' ' + _password);
    connection((db) => {
        db.collection('users')
            .findOne({name:_username,password:_password})

            .then((member) => {
               // response.data = users;
                //console.log('email response  ' + json.stringify(users));
                res.json(member);
            })
            .catch((err) => {
                console.log('dologin err ' + res);
                sendError(err, res);
            });
    });
});


router.get('/byemail',(req,res)=> {
    var _email = req.query.email;
    console.log('finding  ' + _email);
    connection((db) => {
        db.collection('users')
            .findOne({email:_email})

            .then((users) => {
               // response.data = users;
                //console.log('email response  ' + json.stringify(users));
                res.json(users);
            })
            .catch((err) => {
                console.log('email err ' + res);
                sendError(err, res);
            });
    });
});

router.post('/members/add', (req, res) => {
   const newname = req.body.name;
   console.log('/members/add  ' + newname);

   connection((db) => {
   db.collection('users')
   .insert(req.body, (err, result) => {
     if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
    });
});
*/

router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newMember = new Member({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      ispasswordtemp: req.body.ispasswordtemp,
      email: req.body.email,
      cellphone: req.body.cellphone,
      gender: req.body.gender      
    });
    // save the user
    newMember.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new member.'});
    });
  }
});

router.post('/login', function(req, res) {
	console.log('login request ' +  req.body.username);
  Member.findOne({
    username: req.body.username
  }, function(err, member) {
    if (err) throw err;

    if (!member) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      member.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          console.log('User and Password match - sign to get jwt token');
          var token = jwt.sign(member.toObject(), config.secret);
          console.log('Got token ' + token);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;