//Share collection
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var ListOfMembers = new Schema({
    Member: Schema.Types.ObjectId, 
    MemberName: String,
    eMail: String, 
    Status: String, 
    StatusDate: Date
  });
var UsageSchedule = new Schema({
    Member:Schema.Types.ObjectId, 
    MemberName: String, 
    DateFrom: Date, 
    DateTo: Date,
    HourFrom: Date,  
    HourTo: Date,  
    Status: String, 
    Comment: String
});

var ShareSchema = new Schema({
  ShareName: {
        type: String,
        unique: true,
        required: true
    },
  ShareDescription: {
        type: String,
        required: true
    },
  ResourceType: String,
  OwnerId: Schema.Types.ObjectId,
  OwnerName: String,
  CreateDate: Date,
  //Location: {type: "Point",coordinates:[x,y]},
  List_of_Members:[ListOfMembers],
  Usage_Schedule: [UsageSchedule]

  //status values: [Request, Approved, Denied, Cancelled]

});



module.exports = mongoose.model('Share', ShareSchema);


 
 