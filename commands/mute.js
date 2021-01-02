"use strict";

const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'mute',
	description: 'Mutes the specified user.',
	guildOnly: true,
	aliases: ['silence', 'shutup'],
	usage: `${prefix}mute <user> <reason>`,
	args: true,
	permissions: ['MUTE_MEMBERS'],
	category: 'moderation',
	execute(message) {
		const role = message.guild.roles.cache.find(x => x.name === 'muted');
		const member = message.mentions.members.first();
		const embed = new Discord.MessageEmbed()
			.setTitle('Mute Succesful')
			.setDescription(`${member} has been muted`)
			.setColor(embedColor);

		if (typeof role === undefined) {
			message.guild.roles.create({
				data: {
					name: 'muted',
					permissions:[{
						'SEND_MESSAGES': false,
						'ADD_REACTIONS': false,
					}],
				},
			});
		}
		member.roles.add(role).then(message.channel.send(embed));
	},
};