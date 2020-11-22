var express = require('express');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var gmailNode = require('gmail-node');

var configDB = require('./server/config/database');
mongoose.Promise = global.Promise;
mongoose.connect(configDB.database)
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

var app = express();
//see https://medium.com/@ryanchenkie_40935/angular-cli-deployment-host-your-angular-2-app-on-heroku-3f266f13f352
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/* Client-Secret Downloaded from Google Development */
var clientSecret = {
    installed: {
        client_id: "919531478633-el3onl9r1ok4ldsrgve5fg8imp5lsdi8.apps.googleusercontent.com",
        project_id: "weshare-186117",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://accounts.google.com/o/oauth2/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_secret: "618xvu3UBxKCzGR8KwzKVOlJ",
        redirect_uris: [
            "urn:ietf:wg:oauth:2.0:oob",
            "http://localhost"
        ]
    }
};

// ClientSecret: 
gmailNode.init(clientSecret, './token.json', initComplete);
 
function initComplete(err, dataObject) {
    if(err){
        console.log('Error ', err);
    }else {

    }
}


app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined')); //was dev
app.use(passport.initialize());

app.set('views', path.join(__dirname, 'src','app','views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/',require('./src/app/routes/index.js'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log('err.message  ' + err.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(500, {status:500, message: err.message, type:'internal'});
  //res.render(err.message);
});

module.exports = app;

