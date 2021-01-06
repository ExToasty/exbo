"use strict";

const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'ping',
	description: 'returns \'pong\'',
	usage: `${prefix}ping`,
	aliases: ['latency'],
	guildOnly: false,
	minArgs: 0,
	selfExecute: false,
	requireMention: false,
	wip: false,
	cooldowm: 3,
	deleteMessage: true,
	permissions: ['SEND_MESSAGES'],
	category: 'information',
	execute(message) {
		message.reply('Calculating latency...').then((result) => {
			const ping = Date.now() - message.createdTimestamp;

			const embed = new Discord.MessageEmbed()
				.setColor(embedColor)
				.setTitle('__Latency Information__')
				.addFields(
					{ name: 'Bot Latency', value: `${ping} ms`, inline: true },
				);

			result.edit(`${message.author} Ping calculated!`);
			message.channel.send(embed);
		});
	},
};