const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'restart',
	description: 'Restarts the bot',
	usage: `${prefix}restart`,
	// aliases: [''],
	guildOnly: false,
	args: false,
	selfExecute: false,
	requireMention: false,
	wip: false,
	cooldown: 10,
	deleteMessage: true,
	permissions: ['ADMINISTRATOR'],
	category: 'moderation',
	execute(message) {
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor);

		if (message.author.id === '332555969169063938') {
			embed
				.setTitle('__Restart Succesful__')
				.setDescription(`The bot has been restarted by ${message.member.user.tag}`);

			process.exit().then(message.channel.send(embed));
		}
	},
};