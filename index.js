const ViberBot  = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const winston = require('winston');
const toYAML = require('winston-console-formatter');
var request = require('request');

function createLogger() {
    const logger = new winston.Logger({
        level: "debug" // We recommend using the debug level for development
    });

    logger.add(winston.transports.Console, toYAML.config());
    return logger;
}

const logger = createLogger();

// Creating the bot with access token, name and avatar
const bot = new ViberBot(logger, {
    authToken: "4e7600646567e092-f49608b799d24b2e-57b664085c36ff76", // <--- Paste your token here
    name: "TestViberBot86",  // <--- Your bot name here
    avatar: "https://i.pinimg.com/736x/ca/74/d9/ca74d9f573487edc7f2f718abb14398a.jpg" // It is recommended to be 720x720, and no more than 100kb.
});

if (process.env.NOW_URL || process.env.HEROKU_URL) {
    const http = require('http');
    const port = process.env.PORT || 8080;

    http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(process.env.NOW_URL || process.env.HEROKU_URL));
} else {
    logger.debug('Could not find the now.sh/Heroku environment variables. Please make sure you followed readme guide.');
}
