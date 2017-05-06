/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const mongoose = require('mongoose');
const axios = require('axios');
const logger = require("morgan");
const bodyParser = require("body-parser");

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (true) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });


  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + './src'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, '../src/index'));
  });
}


//Parse json --------------------
// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
//--------------------------------


//MongoDB connection and routes --
//link to the mongoose server
mongoose.connect("mongodb://admin:passcode@ds123331.mlab.com:23331/heroku_qd2kl1h2");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Require mongodb article schema
var User = require("./src/models/User.js");
var Chat = require('./src/models/Chat.js');

app.post('/findScore', function(req, res){

  User.find({}).sort({score: -1}).limit(15).exec(function(error, data) {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
      console.log('High scores were sent');
    }
  });

});

app.post('/save', function(req, res) {
  // Create a new note and pass the req.body to the entry
  var user = new User(req.body);

  // And save the new note the db
  user.save(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    } else {
      res.send(doc);
    }
  });
});

app.post('/getMessage', function(req, res){

  Chat.find({}).exec(function(error, data) {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
      console.log('Messages were sent');
    }
  });

});

app.post('/saveMessage', function(req, res) {
  // Create a new note and pass the req.body to the entry
  var chat = new Chat(req.body);

  // And save the new note the db
  chat.save(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    } else {
      res.send(doc);
    }
  });
});

//-------------------------------------------

app.listen(port, '0.0.0.0', function onStart(error) {
  if (error) {
    console.log(error);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
