"use strict";

const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'say',
	description: 'Returns the arguments specified',
	args: true,
	aliases: ['chat', 'speak', 'text', 'talk'],
	usage: `${prefix}say <message>`,
	category: 'fun',
	deleteMessage: true,
	execute(message, args) {
		if (message.author.id != '332555969169063938' && args.includes('@everyone') || args.includes('@here') && !message.member.hasPermission('ADMINISTRATOR')) {
			const embed = new Discord.MessageEmbed()
				.setColor(embedColor)
				.setTitle('Insufficient Permissions')
				.setDescription(`You don't have the permissions to say this in your message.`);

			return message.channel.send(embed);
		}

		message.channel.send(args.join(' '));
	},
};