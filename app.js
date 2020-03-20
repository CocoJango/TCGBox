var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.router');

var app = express();
const exphbs = require('express-handlebars');

const hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    fieldInError: function (error, field) {
      if(error !== undefined) {
        //console.error(error);
        /*console.log('checking field: ' + field);
        console.log('result === undefined: ' + error === undefined);
        console.log('result includes: ' + error.includes(field));
        console.log('result find:');
        console.log(error.find(element => element.param === field));*/
        return error.find(element => element.param === field);
        //if (ret !== undefined) return ret;
      }
      //if(error === undefined) return false;
      //return error.includes(field);
    },
    json: function(context) {
      return JSON.stringify(context);
    }
  }
});

app.engine('handlebars', hbs.engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');



app.use(logger('dev'));
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
