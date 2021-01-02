const { prefix, embedColor } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'unban',
	description: 'Unbans the user specified.',
	usage: `${prefix}unban <id> [reason]`,
	aliases: ['pardon'],
	guildOnly: false,
	args: true,
	selfExecute: false,
	requireMention: false,
	wip: false,
	cooldown: 5,
	permissions: ['ADMIN'],
	category: 'moderation',
	execute(message, args) {
		const id = args[0];
		const reason = args.slice(1).join(' ');
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Succesfully Unbanned User__');

		if (!reason) {
			embed.setDescription(`__**\`${id}\`**__\` has been unbanned\``);

			return message.guild.members.unban(id)
				.then(message.channel.send(embed))
				.catch();
		}
		embed.setDescription(`__**\`${id}\`**__\` has been unbanned for ${reason}\``);

		return message.guild.members.unban(id, [reason])
			.then(message.channel.send(embed))
			.catch();
	},
};