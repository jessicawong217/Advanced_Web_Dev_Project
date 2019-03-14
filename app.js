var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/user.route');
var menuRouter = require('./routes/menu/menu.route');
var ordersRouter = require('./routes/orders/order.route');
var counterRouter = require('./routes/counter/counter.route');
var tablesRouter = require('./routes/tables/table.route');

const config = require('./config/');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('New client connected.');
});

// connect to mongo db
const mongoUri = config.mongodb.host;
mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Configure socket io middleware.
app.use(function (req, res, next) {
    res.io = io;
    next();
});

app.use(logger('local'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// ROUTES
app.use('/', indexRouter);
app.use('/api/menu', menuRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/counter', counterRouter);
app.use('/api/users', usersRouter);
app.use('/api/tables', tablesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = { app: app, server: server };
