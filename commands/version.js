"use strict";

const Discord = require('discord.js');
const { version, prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'version',
	description: 'Returns the version that is specified in the configuration file.',
	usage: `${prefix}version`,
	category: 'information',
	execute(message, args) {
		message.delete( {timeout: 1000 }).catch(console.error);
		const embed = new Discord.MessageEmbed(args)
			.setTitle('__Version__')
			.setDescription(`\`${version}\``)
			.setColor(embedColor);

		message.channel.send(embed);
	},
};
