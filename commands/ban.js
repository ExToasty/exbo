'use strict';

const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'ban',
	description: 'Bans the user specified from the current server',
	usage: `${prefix}ban <user> [reason]`,
	// aliases: [''],
	guildOnly: true,
	args: true,
	selfExecute: false,
	requireMention: true,
	wip: false,
	cooldown: 3,
	deleteMessage: true,
	permissions: 'ADMINISTRATOR',
	category: 'moderation',
	async execute(message, args) {
		const member = message.mentions.members.first();
		const reason = args.slice(0).join(' ');
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('Ban Succesful')
			.setDescription(`:white_check_mark: ${member.tag} has been banned`);

		if (!args.slice(1).length) {
			return await message.guild.members.ban(member.tag)
				.then(message.channel.send(embed));
		}
		embed.setDescription(`:white_check_mark: ${member.tag} has been banned for ${reason}`);
		await message.guild.members.ban(member, { reason: reason })
			.then(message.channel.send(embed))
			.catch();
	},
};