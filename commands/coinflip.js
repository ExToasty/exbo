const { prefix } = require('../config.json');

module.exports = {
	name: 'coinflip',
	description: 'Returns "heads" or "tails"',
	usage: `${prefix}coinflip <custom side 1> <custom side 2>`,
	aliases: ['flip', 'coin'],
	guildOnly: false,
	minArgs: 0,
	requireMention: false,
	wip: false,
	cooldown: 3,
	deleteMessage: true,
	permissions: ['SEND_MESSAGES'],
	category: 'fun',
	execute(message, args) {
		message.delete({ timeout: 1000 });

		const responses = ['heads', 'tails'];
		const response = responses[Math.floor(Math.random() * responses.length)];

		if (!args.length) {
			return message.channel.send(`The coin landed on ${response}.`).catch(console.error());
		}
		if (args.length !== 2) {
			return message.channel.send('You must only provide two custom arguments to the coinflip command.');
		}
		const customResponse = args[Math.floor(Math.random() * args.length)];
		message.channel.send(`You landed on ${customResponse}`).catch(console.error());
	},
};