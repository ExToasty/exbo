const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'unmute',
	description: 'If the specified user is muted, the it unmutes them.',
	usage: `\`${prefix}unmute <member> [reason]\``,
	permissions: ['MANAGE_ROLES'],
	guildOnly: true,
	selfExecute: true,
	args: true,
	deleteMessage: true,
	category: 'moderation',
	wip: true,
	execute(message) {
		const role = message.member.roles.find(role2 => role2.name === 'muted');
		const member = message.mentions.members.first();
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Unmute Succesful__')
			.setDescription(`\`${member} has been unmuted.\``);

		if (member.roles.cache.some(role3 => role3.name === 'muted')) {
			return message.member.removeRole(role)
				.catch()
				.then(message.channel.send(embed));
		}
		else {
			embed
				.setTitle('__Unmute Unsuccesful__')
				.setDescription(`\`${member.toString()} is not muted\``);

			return message.channel.send(embed);
		}
	},
};