const { prefix } = require('../config.json');

module.exports = {
	name: 'coinflip',
	description: 'Returns "heads" or "tails"',
	usage: `${prefix}coinflip`,
	aliases: ['flip', 'coin'],
	guildOnly: false,
	minArgs: 0,
	requireMention: false,
	wip: false,
	cooldown: 3,
	deleteMessage: true,
	permissions: ['SEND_MESSAGES'],
	category: 'fun',
	execute(message) {
		const responses = ['heads', 'tails'];
		const response = responses[Math.floor(Math.random() * responses.length)];

		message.channel.send(`The coin landed on ${response}`).catch(console.error());
	},
};