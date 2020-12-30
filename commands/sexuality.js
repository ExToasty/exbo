"use strict";

const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'sexuality',
	description: 'Calculates with advanced algorightms what your sexuality is.',
	aliases: ['test', 'sex'],
	guildOnly: false,
	permissions: 'SEND_MESSAGES',
	usage: `${prefix}sexuality [mention]`,
	cooldown: 5,
	category: 'fun',
	execute(message, args) {
		const percentage = Math.floor(Math.random() * 100) + 1;
		const responses = ['homosexual', 'heterosexual', 'asexual', 'bisexual'];
		const sexuality = responses[Math.floor(Math.random() * responses.length)];
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Sexuality Test__');

		if (!args.length) {
			embed
				.setDescription(`You are ${percentage}% ${sexuality}`);
			return message.channel.send(embed);
		}
		else if (message.mentions.users.first()) {
			embed
				.setTitle('__Invalid Arguement__')
				.setDescription('You need to mention a user.');
			return message.channel.send(embed);
		}
		embed.setDescription(`${args[0]} is ${percentage}% ${sexuality}`);
		message.channel.send(embed);
	},
};