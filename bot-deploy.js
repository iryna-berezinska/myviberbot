'use strict';

let prompt = require("prompt");
let colors = require("colors/safe");
let shell = require("shelljs");
let moniker = require("moniker");

let randomBotNames = moniker.generator([moniker.verb, moniker.noun], {
	maxSize: 10,
	encoding: 'utf-8',
	glue: '-'
});

function deployToNow(accessToken) {
	if (!shell.which("now")) {
		shell.echo(colors.red.bold("Sorry, this script requires now CLI. Please follow the installment procedure at https://now.sh"));
		shell.exit(0);
	}

	if (shell.exec("now -e VIBER_PUBLIC_ACCOUNT_ACCESS_TOKEN_KEY=\'" + accessToken + "\'").code !== 0) {
		shell.echo("Error: Now set environment variable failed");
		shell.exit(1);
		return;
	}

	shell.echo("Success! Your bot is deployed to now!");
}


prompt.message = colors.yellow.underline("Viber Sample Bot Deployment Helper");
prompt.start();

