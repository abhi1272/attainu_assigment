const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const http = require('http');
const routeLoggerMiddleware = require('./app/middleware/routeLogger');
const globalErrorMiddleware = require('./app/middleware/appErrorHandler');
const mongoose = require('mongoose');
const appConfig = require('./config/appConfig')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routeLoggerMiddleware.logIp);
app.use(globalErrorMiddleware.globalErrorHandler);

// app.use(express.static(path.join(__dirname, 'client')));


const modelsPath = './app/model';
const routesPath = './app/route';

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

//Bootstrap models
fs.readdirSync(modelsPath).forEach(function (file) {
  if (~file.indexOf('.js')) require(modelsPath + '/' + file);
});
// end Bootstrap models

// Bootstrap route
fs.readdirSync(routesPath).forEach(function (file) {
  if (~file.indexOf('.js')) {
    let route = require(routesPath + '/' + file);
    route.setRouter(app);
  }
});

// calling global 404 handler after route

app.use(globalErrorMiddleware.globalNotFoundHandler);


const server = http.createServer(app);


server.listen(4000, () => {
    console.log('server listening at port 4000')
    mongoose.connect(appConfig.db.uri, (err) => {
        if(err){
            throw error
        }else{
            console.log('Database connected successfully')
        }
    })
})

module.exports = app;