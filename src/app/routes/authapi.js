var mongoose = require('mongoose');
var passport = require('passport');

var config = require('../../../server/config/database');
require('../../../server/config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var User = require('../../../server/models/user');



router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    User.findOne({email:req.body.email}, function(err, user) {
      if (err) {
        return res.json({success: false, msg: err});
      }
      if (user == null) {
        var newUser = new User({
          username: req.body.username,
          password: req.body.password,
          name: req.body.name,
          ispasswordtemp: req.body.ispasswordtemp,
          email: req.body.email,
          cellphone: req.body.cellphone,
          gender: req.body.gender      
        });
      // save the user
      newUser.save(function(err, newuser) {
        if (err) {
          return res.json({success: false, msg: 'Username already exists.'});
        }
        if (newuser){
          return res.json({success: true, userid: newuser._id,msg: 'Successful created new member.'});
      }
    });
    } else {
      return res.json({success: false, msg: 'Username already exists.'});
    }
  });
  }
});

router.post('/login', function(req, res) {
	console.log('login request ' +  req.body.username);
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          console.log('User and Password match - sign to get jwt token');
          //var payload ={id: user._id};
          var token = jwt.sign(user.toObject(), config.secret);
          console.log('Got token ' + token);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token, userid: user._id,email: user.email});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.get('/byemail',function(req,res){
  var _email = req.query.email;
  console.log('finding  ' + _email);
  User.findOne({email:_email},function(err, user) {
    if (err) console.log('email err ' + err);
    if (user){
     res.json(user);
   } else {
     console.log('email err ' + res);
     res.json(null);
   }  
 });
});

router.get('/byuserid',function(req,res){
  var _id = req.query.id;
  console.log('finding  ' + _id);
  User.findOne({_id:_id},function(err, user) {
    if (err) throw err;

    if (user){
     res.json(user);
   } 
   else {
     console.log('id err ' + res);
     res.json(null);
   }  
 });
});

/* UPDATE User */
router.put('/updateuser/:id', function(req, res, next) {
  console.log('update http');
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
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