"use strict";

const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'server',
	description: 'Displays information about the server',
	guildOnly: true,
	aliases: ['serverinfo'],
	usage: `${prefix}server`,
	category: 'information',
	execute(message) {
		message.delete({ timeout: 1000 }).catch(console.error);
		const bots = 2;
		const members = message.guild.memberCount;
		const users = members - bots;
		const embed = new Discord.MessageEmbed()
			.setTitle(`__Information for ${message.guild.name}__`)
			.setColor(embedColor)
			.addFields(
				{ name: 'Members', value: `\`${members}\``, inline: true },
				{ name: 'Users', value: `\`${users}\``, inline: true },
				{ name: 'Bots', value: `\`${bots}\``, inline: true },
			);

		message.channel.send(embed);
	},
};