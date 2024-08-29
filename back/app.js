var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');
var app          = express();
const cors       = require('cors')
const bcrypt     = require('bcrypt');
const jwt        = require('jsonwebtoken');
const bodyParser = require('body-parser');
app.use(cors())

app.use(bodyParser.json({limit: '100000mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100000mb', extended: true}))

//COMPONENTS
var indexRouter     = require('./routes/index');
var especialista    = require('./routes/coll_especialista');
var specialties     = require('./routes/coll_specialties');
var documents_types = require('./routes/coll_documents_types');
var citas           = require('./routes/coll_cita');
var eps             = require('./routes/coll_eps');
var patient         = require('./routes/coll_patient');
var users           = require('./routes/coll_users');
var auth            = require('./routes/auth');
var sugerencia      = require('./routes/coll_sugerencia');


//COMPONENTS

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//LAS RUTAS DEBEN QUEDAR ABAJO DE TODO ESTO
app.use('/', indexRouter);
app.use('/especialista', especialista);
app.use('/specialties', specialties);
app.use('/documentsTypes', documents_types);
app.use('/cita', citas);
app.use('/eps', eps);
app.use('/patient', patient);
app.use('/auth', auth);
app.use('/users', users);
app.use('/sugerencias', sugerencia);


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
