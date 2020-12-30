"use strict";

const Discord = require('discord.js');
const { version, prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'version',
	description: 'Returns the version that is specified in the configuration file.',
	usage: `${prefix}version`,
	category: 'information',
	execute(message, args) {
		message.delete({ timout: 1000 });
		const embed = new Discord.MessageEmbed(args)
			.setTitle('Version')
			.setDescription(`${version}`)
			.setColor(embedColor);

		message.channel.send(embed);
	},
};
