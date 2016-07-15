var Bot = require('slackbots'),
    assert = require('assert'),
    dotenv = require('dotenv'),
    fetch = require('node-fetch');

dotenv.load({silent: true});

assert(process.env.SLACK_TOKEN, 'missing SLACK_TOKEN in env');
assert(process.env.SLACK_NAME, 'missing SLACK_NAME in env');
assert(process.env.SLACK_CHANNEL, 'missing SLACK_CHANNEL in env');
assert(process.env.STACK_OVERFLOW_TAG, 'missing STACK_OVERFLOW_TAG in env');
assert(process.env.REFRESH_RATE_SECONDS >= 60, 'REFRESH_RATE_SECONDS must be >= 60');

var API_URL = 'https://api.stackexchange.com'
  + '/2.2/search/advanced'
  + '?site=stackoverflow'
  + '&order=desc'
  + '&sort=creation'
  + '&tagged={tag}'
  + '&fromdate={fromdate}';

var bot;

if (process.env.RUN_ONCE) {
  pollQuestions();
} else {
  var bot = new Bot({token: process.env.SLACK_TOKEN, name: process.env.SLACK_NAME});
  bot.on('start', function() {
    setInterval(pollQuestions, process.env.REFRESH_RATE_SECONDS * 1000);
  });
}

var fromdate = Math.floor((new Date()) / 1000);

function pollQuestions () {
  var url = API_URL
    .replace('{tag}',encodeURIComponent(process.env.STACK_OVERFLOW_TAG))
    .replace('{fromdate}', fromdate);
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.items.forEach(postNewQuestion));
}

function postNewQuestion (question) {
  fromdate = Math.max(fromdate, question.creation_date);
  if (bot) {
    bot.postMessageToChannel(process.env.SLACK_CHANNEL, question.link);
  } else {
    console.log(question);
  }
}
