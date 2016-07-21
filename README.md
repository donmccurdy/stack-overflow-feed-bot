# Slack Bot – Stack Overflow Feed

Posts links in Slack for each new Stack Overflow question with a given tag.

## Setup

1. [Create a new Bot User](https://api.slack.com/bot-users#how_do_i_create_custom_bot_users_for_my_team) for your Slack team (you'll need to be an admin). You only need a *Bot Access Token*.
2. [Create an empty v2.0 app for the Stack Exchange API](http://stackapps.com/apps/oauth/register). You only need to get an API *Key*; ignore the rest.
3. Clone or [download this repository](https://github.com/donmccurdy/stack-overflow-feed-bot/archive/master.zip).
4. In the project folder, create a new `.env` file by coping `.env-example`. Fill in details from the previous steps, including your Slack *Access Token* and Stack Overflow *Key*.  If you're on Heroku, you can [use Heroku config](https://devcenter.heroku.com/articles/config-vars#setting-up-config-vars-for-a-deployed-application).
5. Run `npm install`.
6. Run `npm start`.

## Debugging

If you're having issues, you can start the bot in debug mode by setting `RUN_ONCE=true` in your environment. Try using the "javascript" tag to test – it gets new questions quite frequently.

## References

* [Stack Overflow API](https://api.stackexchange.com/docs/advanced-search)
* [Building a Slack Bot with Nodejs](https://scotch.io/tutorials/building-a-slack-bot-with-node-js-and-chuck-norris-super-powers)
