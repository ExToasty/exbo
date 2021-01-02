const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'unmute',
	description: 'If the specified member is muted, the it unmutes them.',
	usage: `\`${prefix}unmute <user> [reason]\``,
	permissions: ['MANAGE_ROLES'],
	guildOnly: true,
	selfExecute: true,
	args: true,
	requireMention: true,
	deleteMessage: true,
	category: 'moderation',
	wip: true,
	execute(message, args) {
		const reason = args.slice(1).join(' ');
		const mutedRole = message.member.roles.cache.find(role => role.name === 'muted');
		const target = message.mentions.members.first();
		const member = message.guild.members.cache.get(target.id);
		const embed = new Discord.MessageEmbed().setColor(embedColor);

		if (!member.roles.cache.some(role => role.name === 'muted')) {
			embed
				.setTitle('__Unmute Unsuccesful__')
				.setDescription(`__**\`${target}\`**__\` is not muted\``);

			return message.channel.send(embed);
		}

		if (!reason) {
			embed
				.setTitle('__Unmute Succesful__')
				.setDescription(`__**\`${target}\`**__\` has been unmuted.\``);

			return member.roles.remove(mutedRole)
				.then(message.channel.send(embed))
				.catch();
		}

		embed
			.setTitle('Unmute Succesful')
			.setDescription(`__**\`${target}\`**__\` has been unmuted for ${reason}\``);

		return member.roles.remove(mutedRole, [reason])
			.then(message.channel.send(embed))
			.catch();

	},
};