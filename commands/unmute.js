const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'unmute',
	description: 'If the specified user is muted, the it unmutes them.',
	usage: `\`${prefix}unmute <user> [reason]\``,
	permissions: ['MANAGE_ROLES'],
	guildOnly: true,
	selfExecute: true,
	args: true,
	requireMention: true,
	deleteMessage: true,
	category: 'moderation',
	wip: true,
	execute(message, args, getUserFromMention) {
		const reason = args.slice(1).join(' ');
		const mutedRole = message.user.roles.cache.some(role => role.name === 'muted');
		const user = getUserFromMention(args[0]);
		const embed = new Discord.MessageEmbed().setColor(embedColor);

		if (!user.roles.cache.some(role => role.name === 'muted')) {
			embed
				.setTitle('__Unmute Unsuccesful__')
				.setDescription(`__**\`${user}\`**__\` is not muted\``);

			return message.channel.send(embed);
		}
		if (!reason) {
			embed
				.setTitle('__Unmute Succesful__')
				.setDescription(`__**\`${user}\`**__\` has been unmuted.\``);

			return user.remove(mutedRole)
				.then(message.channel.send(embed))
				.catch();
		}
		embed
			.setTitle('Unmute Succesful')
			.setDescription(`__**\`${user}\`**__\` has been unmuted for ${reason}\``);

		return user.remove(mutedRole, [reason])
			.then(message.channel.send(embed))
			.catch();
	},
};