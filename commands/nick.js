const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'nick',
	description: 'Sets the nickname of the user specified',
	usage: `${prefix}nick <user/nickname> [nickname]`,
	aliases: ['nickname', 'setnick', 'setnickname'],
	guildOnly: true,
	args: true,
	selfExecute: true,
	requireMention: false,
	wip: false,
	cooldown: 2,
	deleteMessage: true,
	permissions: ['MANAGE_NICKNAMES'],
	category: 'moderation',
	execute(message, args) {
		const member = message.mentions.members.first();
		const nick = args.slice(1).join(' ');
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Succesfully Changed Nickname__');

		if (!member) {
			embed
				.setDescription(`\`${message.author} changed their nickname to "${nick}"\``);
			return message.author.setNickname(args[0]).then(message.channel.send(embed));
		}
		embed.setDescription(`\`${message.author} changed ${member}'s nickname to ${args[1]}.\``);
		return member.setNickname(nick).then(message.channel.send(embed));
	},
};