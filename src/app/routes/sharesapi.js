var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var gmailNode = require('gmail-node');

var passport = require('passport');
var config = require('../../../server/config/database');
require('../../../server/config/passport')(passport);
var jwt = require('jsonwebtoken');

var Share = require('../../../server/models/share.js');
var User = require('../../../server/models/user.js');

router.get('/test', function(req,res,next){
  res.json({message: "test!"});
});

/* GET ALL Shares */
router.get('/getall', function(req, res, next) {
  Share.find(function (err, shares) {
    if (err) return next(err);
    res.json(shares);
  });
});
/* GET All Shares BY member */
router.get('/getMemberShares/:id', function(req, res, next) {
  console.log('getMemberShares');
  Share.find({ "List_of_Members.Member": req.params.id }).
        //and([{ "List_of_Members.Member": id }]).
        exec(function(err, shares) {
          if (err){
            res.json(err);
          }
          if (shares.length > 0){
            res.json(shares);
          } 
        });
      });

/* GET SINGLE Share BY ID */
router.get('/getsingle/:id', function(req, res, next) {
  Share.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Share */
router.post('/saveshare', passport.authenticate('jwt', { session: false }), function(req, res, next){
//  router.post('/', function(req,res){
  console.log('Save share');
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      _id: decoded._id
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {

        var instance = new Share(req.body);
        instance.OwnerId = user._id;
        instance.OwnerName = user.username;
        instance.CreateDate = new Date();
        instance.isNew = true;
        instance.save(function(err, post) { 
          if (err){
            return next(err);
          } else {
            res.json(post);
          }
        });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }

});  

/* Add Member to Share */
router.put('/addMember/:id',  function(req, res, next) {
//  router.post('/', function(req,res){
  console.log('Add Member to Share');
  
  Share.findById(req.params.id, function (err, share) {
    if (err) return next(err);
    var memberExists = false;
    for (var i = 0; i < share.List_of_Members.length; i++) {
      if(share.List_of_Members[i].MemberName == req.body.UserName) {
        memberExists = true;
      }
      if (req.body.UserId != null && share.List_of_Members[i].Member == req.body.UserId){
        memberExists = true;
      }
    }
    if (memberExists) {
      res.json(false)
    } else {
      console.log('add member');
      share.List_of_Members.push({
        Member: req.body.UserId,
        MemberName: req.body.UserName,
        eMail: req.body.Email,
        Status: "Request",
        StatusDate: new Date()
      });

      share.save(function(err, s) { 
        if (err) return next(err);
        res.json(s);
      });
    };
  });
});

/* Add Temp Member to Share */
router.put('/addTempMember/:id',  function(req, res, next) {
//  router.post('/', function(req,res){
  console.log('Add Temp Member to Share');
  
  Share.findById(req.params.id, function (err, share) {
    if (err) return next(err);
    var memberExists = false;
    for (var i = 0; i < share.List_of_Members.length; i++) {
      if(share.List_of_Members[i].MemberName == req.body.UserName){
        memberExists = true;
      }
    }
    if (memberExists) {
      res.json(false)
    } else {
      share.List_of_Members.push({
        MemberName: req.body.name,
        eMail: req.body.email,
        Status: "Request",
        StatusDate: new Date()
      });

      share.save(function(err, s) { 
        if (err) return next(err);
        res.json(s);
      });
    };
  });
});


/* UPDATE Share */
router.put('/updateshare/:id', function(req, res, next) {
  console.log('update http');
  Share.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Share*/
router.delete('/deleteshare/:id', function(req, res, next) {
  Share.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*
router.put('/addSchedule/:id',  function(req, res, next) {
//  router.post('/', function(req,res){
  console.log('Add schedule to Share');
  
  Share.findById(req.params.id, function (err, share) {
    if (err) return next(err);
    var dateFrom = new Date(req.body.Day.year, req.body.Day.month -1 , req.body.Day.day,req.body.Time.hour,req.body.Time.minute);
    var dateTo = new Date(req.body.Day.year, req.body.Day.month -1 , req.body.Day.day,req.body.Time.hour + req.body.Hours,req.body.Time.minute);
    share.Usage_Schedule.push({

      Member: req.body.UserId,
      MemberName: req.body.UserName,
      DateFrom: dateFrom, 
      DateTo: dateTo,
      Status: "Request",
      Comment: "New schedule request"
    });

    share.save(function(err, s) { 
      if (err) return next(err);
      res.json(s);
    });
  });
  
});
*/

/* GET SINGLE Share BY ID */
router.put('/getIsSchedAvail/:id', function(req, res, next) {

 // var dateFrom = new Date(req.body.Day.year, req.body.Day.month -1, req.body.Day.day,req.body.Time.hour,req.body.Time.minute);
  //var dateTo = new Date(req.body.Day.year, req.body.Day.month - 1, req.body.Day.day,req.body.Time.hour + req.body.Hours,req.body.Time.minute);


  //Share.find({ "_id": req.params.id }).
//  Share.find().
//select({'Usage_Schedule.dateFrom':1}).
//        and({ "Usage_Schedule.DateFrom": {"$gt": dateFrom }}).
//and([
//  {$or:[        
//   { "Usage_Schedule.DateFrom": { "$lt": dateTo,"$gte": dateFrom } }, 
//   { "Usage_Schedule.DateTo": { "$lte": dateTo, "$gt":dateFrom } }
//   ]
// }    
// ]).

numTakenDays(req.params.id,req.body.Day.year,req.body.Day.month,req.body.Day.day,req.body.Time.hour,req.body.Time.minute,req.body.Hours, function(t,err){
  if (t> 0){
    res.json(1);
  }else{
    res.json(0);
  }
  }) ;

//  Share.find({ "_id": req.params.id }, 
//           {"Usage_Schedule": {$elemMatch: 
//                {$or:[        
//                    { DateFrom: { "$lt": dateTo,"$gte": dateFrom } }, 
//                    { DateTo: { "$lte": dateTo, "$gt":dateFrom } }
//                      ]
//                } 
//             }
//           }).
//select({'Usage_Schedule._id':1}).
//exec(function(err, takenDates) {
//  if (err){
//    res.json(err);
//  }
//  if (takenDates["0"].Usage_Schedule.length > 0){
//    res.json(takenDates["0"].Usage_Schedule.length);
//  } else {
 //   res.json(takenDates["0"].Usage_Schedule.length);
 // }
//});
});

router.post('/schedreq/:id/:email', function(req, res, next) {
  console.log('schedreq');
  var returnmessage = '';
  User.findOne({email:req.params.email}, function(err, user) {
    if (err) {
      returnmessage = 'Error in getting user info: ' + err;
    };
    if (user) {

      numTakenDays(req.params.id,req.body.Day.year,req.body.Day.month,req.body.Day.day,req.body.Time.hour,req.body.Time.minute,req.body.Hours, function(t,err){

        if (t> 0){
          returnmessage = 'This time is not available';
          res.json(1);
        } else {
          saveschedule(req.params.id,user.name,user._id,req.body.Day.year,req.body.Day.month,req.body.Day.day,req.body.Time.hour,req.body.Time.minute,req.body.Hours);
          returnmessage = 'Your request has been successfully scheduled for: ' +  req.body.Day.day + '/' + req.body.Day.month + '/' + req.body.Day.year + '/' + req.body.Time.hour + ':' + req.body.Time.minute + ' for ' + req.body.Hours + ' hour(s)';
          res.json(0);
        }
        var emailMessage = {
          to: req.params.email,
          subject: "Notification from weShare of Schedule request",
          message: returnmessage,
          'Content-type': 'text/html;charset=iso-8859-1',
          'MIME-Version': '1.0'
        };
        sendmail(emailMessage);
      }) ;
    }
  });
});

numTakenDays = function(iShare,iyear,imonth,iday,ihour,imin, q,cb){
  var dateFrom = new Date(iyear, imonth -1, iday,ihour,imin);
  var dateTo = new Date(iyear, imonth - 1, iday, Number(ihour) + Number(q),imin);
  Share.find({ "_id": iShare }, 
   {"Usage_Schedule": {$elemMatch: 
    {$or:[        
      { DateFrom: { "$lt": dateTo,"$gte": dateFrom } }, 
      { DateTo: { "$lte": dateTo, "$gt":dateFrom } }
      ]
    } 
  }
}).
  exec(function(err, takenDates) {
    if (err){
      console.log(err);
    }

    return cb(takenDates["0"].Usage_Schedule.length > 0);

  });
}

saveschedule = function(iShare,uName,uId, iyear,imonth,iday,ihour,imin, q){
  Share.findById(iShare, function (err, share) {
    if (err) return next(err);
    var dateFrom = new Date(iyear, imonth -1, iday,ihour,imin);
    var dateTo = new Date(iyear, imonth - 1, iday, Number(ihour) + Number(q),imin);
    share.Usage_Schedule.push({
      Member: uId,
      MemberName: uName,
      DateFrom: dateFrom, 
      DateTo: dateTo,
      Status: "Request",
      Comment: "New schedule request"
    });

    share.save(function(err, s) { 
      if (err) {
        console.log(err);
      }
    });
  });
};

router.put('/registermember/:email', function(req, res, next) {

  Share.find({ "List_of_Members.eMail": req.params.email })
  .exec(function(err, shares) {
    if (err){
      res.json(err);
    }
    if (shares.length > 0){
      for (var s = 0; s < shares.length; s++) { 
        var tmpshare = shares[s]; 
        var updateData = {
          'List_of_Members.$.Member': req.body.UserId,
          'List_of_Members.$.Status': 'Approved' ,
          'List_of_Members.$.StatusDate': new Date()
        };

        Share.findOneAndUpdate(
          { "_id": tmpshare._id, "List_of_Members.eMail": req.params.email },
          updateData, function(err,response){
            if(err){
              res.json(err);
            }});

        console.log('update registration of member');
      }
    }

  })
});

function sendmail(emailmessage) {
  gmailNode.sendHTML(emailmessage, function (err, data) {
    console.log(err,data);
  });
}

getToken = function (headers) {
  if (headers && headers.authorization) {
    console.log('headers authorization:' + headers.authorization);
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