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
	requireMention: true,
	deleteMessage: true,
	category: 'moderation',
	wip: true,
	execute(message) {
		const mutedRole = message.member.roles.cache.some(role => role.name === 'muted');
		const member = message.mentions.members.first();
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor);

		if (!member.roles.cache.some(role => role.name === 'muted')) {
			embed
				.setTitle('__Unmute Unsuccesful__')
				.setDescription(`__**\`${member.tag}\`**__\` is not muted\``);

			return message.channel.send(embed);
		}
		embed
			.setTitle('__Unmute Succesful__')
			.setDescription(`__**\`${member}\`**__\` is now unmuted\``);

		return message.member.removeRole(mutedRole)
			.catch()
			.then(message.channel.send(embed));
	},
};