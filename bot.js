var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var handler = require('./Handlers/botHandler');

const devBotId = '4e5259a681e67faef0a3db1051';
const prodBotId = process.env.BOT_ID;

var botID = devBotId;

async function respond() {
  var request =  JSON.parse(this.req.chunks[0]),
      botRegex = /^\/Historian(?=[\s,])/;
      console.log(botRegex);
      console.log(request.text);

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);

    var process = await handler.Handle(request.text);

    postMessage(process);

    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(botResponse) {
  var options, body, botReq;

  //botResponse = 'Deebo Samuel is the next Jerry Rice';

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;