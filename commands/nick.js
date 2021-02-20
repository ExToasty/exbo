const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'nick',
	description: 'Sets the nickname of the user specified',
	usage: `${prefix}nick <user> [nickname]`,
	aliases: ['nickname', 'setnick', 'setnickname'],
	guildOnly: true,
	minArgs: 2,
	selfExecute: true,
	requireMention: false,
	wip: false,
	cooldown: 2,
	deleteMessage: true,
	permissions: 'MANAGE_NICKNAMES',
	category: 'moderation',
	execute(message, args) {
		const member = message.mentions.members.first();
		const nick = args.slice(1).join(' ');
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Succesfully Changed Nickname__')
			.setDescription(`\`${message.author} changed ${member}'s nickname to ${args[1]}.\``);
		return member.setNickname(nick).then(message.channel.send(embed));
	},
};