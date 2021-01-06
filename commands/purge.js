const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'purge',
	description: 'Deletes the specified amount of messages.',
	usage: `${prefix}purge <positive integer>`,
	aliases: ['clear', 'delete'],
	guildOnly: true,
	args: true,
	selfExecute: false,
	requireMention: false,
	wip: false,
	cooldown: 3,
	deleteMessage: false,
	permissions: 'MANAGE_MESSAGES',
	category: 'moderation',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('Invalid Value')
			.setDescription('You must choose an integer that is between 1 and 99');

		if (amount < 1 || amount > 100) {
			return message.channel.send(embed);
		}
		return message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
		});
	},
};