var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var NewsRouter = require('./routes/News');
var indexRouter = require('./routes/index');
var bodyParser = require('body-parser'); 


var app = express();

const port = process.env.PORT || 4000;
app.listen(port, function(){
  console.log('server on!!!\nhttp://localhost:'+port,'\n');
  });

app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(require('body-parser').json());

app.use('/', indexRouter);
app.use('/News', NewsRouter);

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
