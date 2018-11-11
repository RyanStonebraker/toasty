var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var port = process.env.PORT || 5000;

var router = express.Router();

var toastFeed = {
  "commands": [],
  "telemetry": []
};

router.get('/', function (request, response) {
  response.json(toastFeed);
});

router.post('/post', function (request, response) {
  let postData = request.body;
  console.log(postData);
  let id = null;
  let validPost = false;
  if ("sender" in postData) {
      id = postData["sender"];
      validPost = true;
  }

  if (!validPost) {
    console.log("Invalid Post!");
    response.send();
    return;
  }

  let currentData = {};
  for (var postParam in postData) {
    currentData[postParam] = postData[postParam];
  }

  toastFeed.commands.push(currentData);
  if (toastFeed.commands.length >= 100)
    toastFeed.commands.shift();
  response.send(toastFeed);
});

router.get('/commands', function (request, response) {
  response.json(toastFeed["commands"]);
});

router.get('/telemetry', function (request, response) {
  response.json(toastFeed["telemetry"]);
});

app.use('/', router);

app.listen(port);
console.log("Listening on localhost:" + port);
