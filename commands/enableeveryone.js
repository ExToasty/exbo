/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'enableeveryone',
	description: 'Lets anyone ping `@everyone`',
	usage: `${prefix}enableeveryone`,
	aliases: ['ee'],
	minArgs: 0,
	requireMention: false,
	execute(message) {
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Command or Alias Not Found__')
			.setDescription(`\`Check if there is a spelling error and retry the command.\``)
			.setFooter('Run `>help` if you want to get a list of commands.');

		message.channel.send(embed)
			.then(after => {
				message.channel.permissionOverwrites.get(message.channel.guild.roles.everyone.id).delete();
			})
			.catch(console.error);
	},
};