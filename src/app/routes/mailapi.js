var express = require('express');
var router = express.Router();

var gmailNode = require('gmail-node');

router.post('/sendmail', function(req, res) {
    var mSubject = "";
    var mAction = "";
    var mMessage = "";
    var fullUrl = req.protocol + '://' + req.get('host') ;

    switch (req.body.messagetype) {
        case "NotifyAdded":
        mSubject = "Notification from weShare of membership";
        mMessage = '<b> You were added to weShare share group for: </b>' + req.body.sharename;
        break;
        case "NotifyRegister":
        mSubject = "Notification from weShare of Registration";
        mMessage = '<b> You need to register to complete membership to weShare share group for: </b>' + req.body.sharename;
        break;
        case "AcceptInvite":
        mSubject = "Request to Accept Invite to weShare";
        mAction  = 'action="' + fullUrl + '/api/mail/acceptinvite/"' + req.body.share + '/' + req.body.email;
        mMessage = '<b> You are invited to join share group for: </b>' + req.body.sharename + 
        '<form name="send" ' + mAction + ' method="POST">' +
        '<input type="submit" value="Accept">' +
        '</form>';
        break;
        case "NotifyOwnerChange":
        mSubject = 'Ownership reassignment to weShare';
        mMessage: '<b> You were appointed the owner of share: </b>' + req.body.sharename;
        break;
        case "SchedForm":
        mSubject = 'Submit a Share schedule request';
        mAction  = 'action="' + fullUrl + '/api/shares/schedreq/' + req.body.share + '/' + req.body.email + '"';
        mMessage = '<b> You can submit a schedule request for : </b>' + req.body.sharename + 
        '<form name="send" ' + mAction + ' method="POST">' +
        '<p>Request Share For Day:</p>' +
        '<input type="date" name="day">' +
        '<p>Time:</p>' +
        '<input type="time" name="time">' +
        '<p>How long:</p>' +
        '<input type="duration" name="quantity" min="1" max="6">' +
        '<br>' +
        '<b>Approval will be mailed to you.</b>' +
        '<input type="Submit">' +
        '</form>';
        break;

       case "schedtable":
        mSubject = "Schedule table for " + req.body.scheddate;
        mMessage = req.body.schedule;
        break;


    }

    var emailMessage = {
        to: req.body.email,
        subject: mSubject,
        message: mMessage,
        'Content-type': 'text/html;charset=iso-8859-1',
        'MIME-Version': '1.0'
    };
    sendmail(emailMessage);
});


router.post('/acceptinvite/:id/:email', function(req, res, next) {
    console.log('acceptinvite');
    res.json(req.params.id + " " + req.params.email );
});

router.post('/declineinvite/:id', function(req, res, next) {
    console.log('declineinvite');
    res.json(req.params.id);
});



router.get('/test',function(req,res,next){
	res.json({message: "test!"});
});

function sendmail(emailmessage) {
  gmailNode.sendHTML(emailmessage, function (err, data) {
    console.log(err,data);

});
};

module.exports = router;