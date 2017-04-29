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
const port = 3000; //isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (isDeveloping) {
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
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
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
mongoose.connect("mongodb://mongodb://admin:passcode@ds141950.mlab.com:41950/heroku_kkh20g2g");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Require mongodb article schema
var User = require("./src/models/User.js");

app.post("/save", function(req, res) {
  // Create a new note and pass the req.body to the entry
  var user = new User(req.body);

  console.log('req ' + req);

  console.log('User ' + user);

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

//-------------------------------------------


app.listen(port, '0.0.0.0', function onStart(error) {
  if (error) {
    console.log(error);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
