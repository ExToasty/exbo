'use strict';
const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');


module.exports = {
	name: 'embed',
	description: 'Embeds the agruments specified.',
	usage: `${prefix}embed <message>`,
	guildOnly: false,
	args: true,
	selfExecute: false,
	requireMention: false,
	wip: false,
	cooldown: 3,
	deleteMessage: true,
	permissions: ['SEND_MESSAGES'],
	category: 'chat',
	execute(message, args) {
		const embed = new Discord.MessageEmbed();
		if (message.author.id !== '332555969169063938' && args.includes('@everyone') || args.includes('@here') && !message.member.hasPermission('ADMINISTRATOR')) {
			embed
				.setColor(embedColor)
				.setTitle('Insufficient Permissions')
				.setDescription(`You don't have the permissions to say this in your message.`);

			return message.channel.send(embed);
		}

		embed
			.setColor(embedColor)
			.setDescription(args.join(' '));

		message.channel.send(embed);
	},
};