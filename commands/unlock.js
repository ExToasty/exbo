const Discord = require('discord.js');
const { prefix, embedColor } = require('../config.json');

module.exports = {
	name: 'unlock',
	description: 'Unlocks the channel the command was executed in.',
	usage: `${prefix}unlock`,
	aliases: ['unlockchannel', 'channelunlock'],
	guildOnly: true,
	minArgs: 0,
	selfExecute: false,
	requireMention: false,
	wip: false,
	cooldown: false,
	deleteMessage: true,
	permissions: ['MANAGE_CHANNELS'],
	category: 'moderation',
	execute(message) {
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('__Channel Has Been Unlocked__')
			.setDescription('`This channel has been reopened for everyone to use.`');

		return message.channel.permissionOverwrites.get(message.guild.roles.everyone.id)
			.then(message.channel.send(embed))
			.catch(console.error);
	},
};