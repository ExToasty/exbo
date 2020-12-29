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
		const user = message.mentions.users.first();
		const reason = args.slice(0).join(' ');
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('Ban Succesful')
			.setDescription(`:white_check_mark: ${user} has been banned`);

		await message.guild.members.ban(user, { reason: reason });
		message.channel.send(embed);
	},
};